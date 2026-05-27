import { Module, Injectable, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Injectable()
class KpiService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(buildingId: string) {
    const period = await this.prisma.kpiPeriod.findFirst({
      where: { buildingId },
      orderBy: [{ year: 'desc' }, { quarter: 'desc' }],
      include: {
        indicators: { include: { category: true } },
      },
    });
    if (!period) return null;

    const categories = await this.prisma.kpiCategory.findMany({ where: { buildingId } });
    const categoryScores = categories.map((c) => {
      const inds = period.indicators.filter((i) => i.categoryId === c.id);
      const sum = inds.reduce((s, i) => s + Number(i.score), 0);
      const max = inds.length * 25; // arbitrary per-indicator max
      return {
        id: c.id,
        name: c.name,
        score: sum,
        maxScore: max || Number(c.maxScore),
        indicatorCount: inds.length,
      };
    });

    const achieved = period.indicators.filter((i) => i.status === 'ON_TRACK').length;
    const needsAttention = period.indicators.filter((i) => i.status === 'NEEDS_ATTENTION').length;
    const offTrack = period.indicators.filter((i) => i.status === 'OFF_TRACK').length;

    const boardMembers = await this.prisma.boardMember.findMany({
      where: { buildingId },
      include: {
        user: { select: { id: true, fullName: true, avatar: true } },
        kpis: { where: { periodId: period.id } },
      },
    });

    // Trend: last 6 periods
    const trend = await this.prisma.kpiPeriod.findMany({
      where: { buildingId },
      orderBy: [{ year: 'asc' }, { quarter: 'asc' }],
      take: 6,
      select: { id: true, year: true, quarter: true, totalScore: true },
    });

    return {
      period,
      summary: {
        totalScore: period.totalScore,
        rating: period.rating,
        achieved,
        needsAttention,
        offTrack,
        totalIndicators: period.indicators.length,
      },
      categoryScores,
      indicators: period.indicators,
      boardMembers: boardMembers.map((b) => ({
        ...b,
        currentScore: b.kpis[0]?.score ?? null,
        currentRating: b.kpis[0]?.rating ?? null,
      })),
      trend,
    };
  }
}

@ApiTags('kpi')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('kpi')
class KpiController {
  constructor(private readonly svc: KpiService) {}

  @Get('overview')
  overview(@CurrentUser() user: any) {
    return this.svc.overview(user.buildingId);
  }
}

@Module({
  providers: [KpiService],
  controllers: [KpiController],
})
export class KpiModule {}
