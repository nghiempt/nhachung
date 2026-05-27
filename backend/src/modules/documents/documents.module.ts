import { Module, Injectable, Controller, Get, Query, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Injectable()
class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(buildingId: string, folderId?: string, q?: string) {
    const folders = await this.prisma.documentFolder.findMany({
      where: { buildingId, parentId: null },
      orderBy: { name: 'asc' },
    });

    const where: any = { buildingId, deletedAt: null };
    if (folderId) where.folderId = folderId;
    if (q) where.name = { contains: q, mode: 'insensitive' };

    const documents = await this.prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { uploadedBy: { select: { id: true, fullName: true } }, folder: true },
    });

    return { folders, documents, total: documents.length };
  }

  async archive(buildingId: string, year?: number) {
    const currentYear = year ?? new Date().getFullYear();
    const docs = await this.prisma.document.findMany({
      where: { buildingId, year: currentYear, deletedAt: null },
      orderBy: [{ month: 'asc' }, { createdAt: 'asc' }],
    });

    const byMonth: Record<number, any[]> = {};
    for (const d of docs) {
      const m = d.month ?? 0;
      (byMonth[m] = byMonth[m] || []).push(d);
    }

    // Category sidebar stats
    const groupedCat = await this.prisma.document.groupBy({
      by: ['category'],
      where: { buildingId, deletedAt: null },
      _count: { _all: true },
    });

    const totalDocs = await this.prisma.document.count({ where: { buildingId, deletedAt: null } });
    const totalSize = await this.prisma.document.aggregate({
      where: { buildingId, deletedAt: null },
      _sum: { fileSize: true },
    });

    const years = await this.prisma.$queryRaw<{ year: number }[]>`
      SELECT DISTINCT year FROM "Document" WHERE "buildingId" = ${buildingId} AND year IS NOT NULL ORDER BY year DESC
    `;

    return {
      stats: {
        totalDocuments: totalDocs,
        totalSizeBytes: Number(totalSize._sum.fileSize ?? 0),
        years: years.length,
      },
      years: years.map((y) => y.year),
      currentYear,
      byMonth,
      categoryStats: groupedCat.map((g) => ({ category: g.category, count: g._count._all })),
    };
  }

  byId(id: string) {
    return this.prisma.document.findUnique({ where: { id } });
  }
}

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
class DocumentsController {
  constructor(private readonly svc: DocumentsService) {}

  @Get()
  list(@CurrentUser() user: any, @Query('folderId') folderId?: string, @Query('q') q?: string) {
    return this.svc.list(user.buildingId, folderId, q);
  }

  @Get('archive')
  archive(@CurrentUser() user: any, @Query('year') year?: string) {
    return this.svc.archive(user.buildingId, year ? parseInt(year, 10) : undefined);
  }

  @Get(':id')
  byId(@Param('id') id: string) { return this.svc.byId(id); }
}

@Module({
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
