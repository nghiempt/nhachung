import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';

@Injectable()
class BuildingsService {
  constructor(private readonly prisma: PrismaService) {}
  list() {
    return this.prisma.building.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'asc' } });
  }
  byId(id: string) {
    return this.prisma.building.findUnique({
      where: { id },
      include: { blocks: true, _count: { select: { apartments: true } } },
    });
  }
}

@ApiTags('buildings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('buildings')
class BuildingsController {
  constructor(private readonly svc: BuildingsService) {}

  @Get()
  list() { return this.svc.list(); }

  @Get(':id')
  byId(@Param('id') id: string) { return this.svc.byId(id); }
}

@Module({
  providers: [BuildingsService],
  controllers: [BuildingsController],
})
export class BuildingsModule {}
