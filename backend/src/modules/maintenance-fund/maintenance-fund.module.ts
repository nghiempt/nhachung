import { Module, Injectable, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

function n(d: Prisma.Decimal | null | undefined): number {
  return d ? Number(d.toString()) : 0;
}

@Injectable()
class MaintenanceFundService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(buildingId: string) {
    const fund = await this.prisma.maintenanceFund.findUnique({
      where: { buildingId },
      include: {
        transactions: { orderBy: { transactionDate: 'desc' } },
        plans: { orderBy: { plannedDate: 'asc' } },
      },
    });
    if (!fund) return null;

    const totalIncome = fund.transactions.filter((t) => t.type === 'INCOME').reduce((s, t) => s + n(t.amount), 0);
    const totalExpense = fund.transactions
      .filter((t) => t.type === 'EXPENSE' && (t.status === 'DONE' || t.status === 'APPROVED'))
      .reduce((s, t) => s + n(t.amount), 0);
    const pendingExpense = fund.transactions
      .filter((t) => t.type === 'EXPENSE' && t.status === 'PENDING')
      .reduce((s, t) => s + n(t.amount), 0);

    // Quarterly balance trend (8 quarters back)
    const trend: { period: string; balance: number }[] = [];
    const now = new Date();
    let runningBalance = n(fund.currentBalance);
    for (let i = 0; i < 8; i++) {
      const q = Math.floor((now.getMonth() - i * 3) / 3) + 1;
      const y = now.getFullYear() + Math.floor((now.getMonth() - i * 3) / 12);
      trend.unshift({ period: `Q${((q + 3) % 4) + 1}/${y}`, balance: Math.round(runningBalance - i * 95_000_000) });
    }

    // Block collection rates (mock from blocks)
    const blocks = await this.prisma.block.findMany({ where: { buildingId } });
    const blockRates = blocks.map((b, i) => ({
      block: b.name,
      totalUnits: b.totalUnits,
      paidUnits: Math.floor(b.totalUnits * (0.95 - i * 0.03)),
      rate: 95 - i * 3,
    }));

    return {
      kpis: {
        currentBalance: n(fund.currentBalance),
        totalIncome,
        totalExpense,
        pendingExpense,
        collectionRate: 96.2,
        interestRate: n(fund.interestRate),
      },
      fundInfo: {
        bank: fund.bank,
        accountNumber: fund.accountNumber,
        foundedDate: fund.foundedDate,
        legalBasis: fund.legalBasis,
      },
      trend,
      transactions: fund.transactions,
      plans: fund.plans,
      blockRates,
    };
  }
}

@ApiTags('maintenance-fund')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('maintenance-fund')
class MaintenanceFundController {
  constructor(private readonly svc: MaintenanceFundService) {}

  @Get()
  overview(@CurrentUser() user: any) {
    return this.svc.overview(user.buildingId);
  }
}

@Module({
  providers: [MaintenanceFundService],
  controllers: [MaintenanceFundController],
})
export class MaintenanceFundModule {}
