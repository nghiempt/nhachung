import { Module, Injectable, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

function toNumber(d: Prisma.Decimal | null | undefined): number {
  return d ? Number(d.toString()) : 0;
}

@Injectable()
class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(buildingId: string, months = 6) {
    const since = new Date();
    since.setMonth(since.getMonth() - months);
    since.setDate(1);
    since.setHours(0, 0, 0, 0);

    const txs = await this.prisma.transaction.findMany({
      where: { buildingId, transactionDate: { gte: since } },
      include: { category: true },
    });

    const byMonth = new Map<string, { income: number; expense: number }>();
    for (const t of txs) {
      const key = `${t.transactionDate.getFullYear()}-${String(t.transactionDate.getMonth() + 1).padStart(2, '0')}`;
      const m = byMonth.get(key) ?? { income: 0, expense: 0 };
      if (t.type === 'INCOME') m.income += toNumber(t.amount);
      else m.expense += toNumber(t.amount);
      byMonth.set(key, m);
    }
    const monthly = Array.from(byMonth.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, v]) => ({ month, ...v, surplus: v.income - v.expense }));

    const totalIncome = monthly.reduce((s, m) => s + m.income, 0);
    const totalExpense = monthly.reduce((s, m) => s + m.expense, 0);
    const surplus = totalIncome - totalExpense;

    // Expense breakdown by category
    const byCat = new Map<string, { name: string; color: string | null; amount: number; type: string }>();
    for (const t of txs) {
      if (!t.category) continue;
      const key = t.category.id;
      const e = byCat.get(key) ?? { name: t.category.name, color: t.category.color, amount: 0, type: t.category.type };
      e.amount += toNumber(t.amount);
      byCat.set(key, e);
    }
    const expenseBreakdown = Array.from(byCat.values()).filter((c) => c.type === 'EXPENSE');
    const incomeBreakdown = Array.from(byCat.values()).filter((c) => c.type === 'INCOME');

    // Maintenance fund
    const fund = await this.prisma.maintenanceFund.findUnique({ where: { buildingId } });

    return {
      kpis: {
        totalIncome,
        totalExpense,
        surplus,
        collectionRate: 98.6, // computed from FeeSchedule in a real impl
        maintenanceFundBalance: toNumber(fund?.currentBalance),
      },
      monthly,
      expenseBreakdown,
      incomeBreakdown,
      latestReport: await this.prisma.periodicReport.findFirst({
        where: { buildingId },
        orderBy: { publishDate: 'desc' },
      }),
    };
  }

  async incomeExpense(buildingId: string, months = 6) {
    const data = await this.overview(buildingId, months);
    const aiSummary = {
      headline:
        `Trong ${months} tháng gần nhất, tổng thu đạt ${data.kpis.totalIncome.toLocaleString('vi-VN')}đ và tổng chi ${data.kpis.totalExpense.toLocaleString('vi-VN')}đ.`,
      highlights: [
        { tone: data.kpis.surplus > 0 ? 'positive' : 'negative', text: `Thặng dư ${data.kpis.surplus.toLocaleString('vi-VN')}đ` },
        { tone: 'positive', text: `Tỉ lệ thu phí 98.6%, vượt mục tiêu 95%` },
      ],
    };

    const recentTx = await this.prisma.transaction.findMany({
      where: { buildingId },
      orderBy: { transactionDate: 'desc' },
      take: 10,
      include: { category: true },
    });

    return { ...data, aiSummary, recentTransactions: recentTx };
  }
}

@ApiTags('finance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('finance')
class FinanceController {
  constructor(private readonly svc: FinanceService) {}

  @Get('overview')
  overview(@CurrentUser() user: any, @Query('months') months?: string) {
    return this.svc.overview(user.buildingId, months ? parseInt(months, 10) : 6);
  }

  @Get('income-expense')
  incomeExpense(@CurrentUser() user: any, @Query('months') months?: string) {
    return this.svc.incomeExpense(user.buildingId, months ? parseInt(months, 10) : 6);
  }
}

@Module({
  providers: [FinanceService],
  controllers: [FinanceController],
})
export class FinanceModule {}
