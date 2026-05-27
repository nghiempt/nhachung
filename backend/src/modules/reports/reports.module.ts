import { Module, Injectable, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Injectable()
class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(buildingId: string, type?: ReportType, year?: number) {
    const where: any = { buildingId };
    if (type) where.type = type;
    if (year) {
      where.publishDate = {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      };
    }
    const items = await this.prisma.periodicReport.findMany({
      where,
      orderBy: { publishDate: 'desc' },
    });

    const all = await this.prisma.periodicReport.count({ where: { buildingId } });
    const grouped = await this.prisma.periodicReport.groupBy({
      by: ['type'],
      where: { buildingId },
      _count: { _all: true },
    });
    const tabs = { all, ...Object.fromEntries(grouped.map((g) => [g.type, g._count._all])) };

    const stats = {
      totalReports: all,
      published: items.filter((i) => i.publishDate <= new Date()).length,
      pending: 3,
      upcoming: 2,
    };

    return { stats, tabs, items };
  }
}

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
class ReportsController {
  constructor(private readonly svc: ReportsService) {}

  @Get()
  list(@CurrentUser() user: any, @Query('type') type?: ReportType, @Query('year') year?: string) {
    return this.svc.list(user.buildingId, type, year ? parseInt(year, 10) : undefined);
  }
}

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
