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
class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(userId: string, buildingId?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { apartments: { include: { apartment: { include: { building: true } } } } },
    });
    if (!user) return null;

    const primary = user.apartments.find((r) => r.role === 'PRIMARY') ?? user.apartments[0];
    const apartment = primary?.apartment;
    const effectiveBuildingId = buildingId ?? apartment?.buildingId;

    // Greeting based on Vietnamese local time (UTC+7)
    const now = new Date();
    const vnHour = (now.getUTCHours() + 7) % 24;
    let greeting = 'Chào buổi sáng';
    if (vnHour >= 11 && vnHour < 18) greeting = 'Chào buổi chiều';
    else if (vnHour >= 18 || vnHour < 5) greeting = 'Chào buổi tối';

    const unreadCount = await this.prisma.userNotification.count({ where: { userId, readAt: null } });

    // Upcoming fees for primary apartment
    const upcomingFees = apartment
      ? await this.prisma.feeSchedule.findMany({
          where: { apartmentId: apartment.id, status: { in: ['PENDING', 'OVERDUE'] } },
          orderBy: { dueDate: 'asc' },
          take: 5,
        })
      : [];

    // Recent notifications (5)
    const recentNotifications = await this.prisma.userNotification.findMany({
      where: { userId },
      orderBy: { notification: { publishedAt: 'desc' } },
      take: 5,
      include: { notification: true },
    });

    // Upcoming events
    const upcomingEvents = effectiveBuildingId
      ? await this.prisma.communityEvent.findMany({
          where: { buildingId: effectiveBuildingId, status: 'UPCOMING' },
          orderBy: { eventDate: 'asc' },
          take: 5,
        })
      : [];

    // Mini finance summary (last month delta)
    const lastMonthSince = new Date();
    lastMonthSince.setMonth(lastMonthSince.getMonth() - 1);
    const monthIncome = effectiveBuildingId
      ? await this.prisma.transaction.aggregate({
          where: { buildingId: effectiveBuildingId, type: 'INCOME', transactionDate: { gte: lastMonthSince } },
          _sum: { amount: true },
        })
      : { _sum: { amount: null } };

    const monthExpense = effectiveBuildingId
      ? await this.prisma.transaction.aggregate({
          where: { buildingId: effectiveBuildingId, type: 'EXPENSE', transactionDate: { gte: lastMonthSince } },
          _sum: { amount: true },
        })
      : { _sum: { amount: null } };

    const openWorkOrders = effectiveBuildingId
      ? await this.prisma.workOrder.count({ where: { buildingId: effectiveBuildingId, status: { in: ['OPEN', 'IN_PROGRESS'] } } })
      : 0;

    const openFeedback = effectiveBuildingId
      ? await this.prisma.feedback.count({ where: { buildingId: effectiveBuildingId, status: { in: ['OPEN', 'IN_PROGRESS'] } } })
      : 0;

    // Quick action items for sidebar
    const quickActions = [
      { id: 'feedback', title: 'Gửi phản ánh', desc: 'Báo cáo sự cố, góp ý' },
      { id: 'work-order', title: 'Yêu cầu bảo trì', desc: 'Tạo work order mới' },
      { id: 'docs', title: 'Tra cứu tài liệu', desc: 'Mở kho tài liệu chung cư' },
    ];

    // News for community section
    const communityNews = effectiveBuildingId
      ? await this.prisma.newsPost.findMany({
          where: { buildingId: effectiveBuildingId, deletedAt: null },
          orderBy: { publishedAt: 'desc' },
          take: 3,
          select: { id: true, title: true, viewCount: true, publishedAt: true, category: true },
        })
      : [];

    return {
      greeting,
      currentDate: now.toISOString(),
      user: {
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
      },
      apartment: apartment
        ? { id: apartment.id, code: apartment.code, building: apartment.building.name }
        : null,
      buildingId: effectiveBuildingId,
      stats: [
        { label: 'Thu chi tháng này', value: n(monthIncome._sum.amount) - n(monthExpense._sum.amount) },
        { label: 'Phản ánh đang xử lý', value: openFeedback },
        { label: 'Work order đang mở', value: openWorkOrders },
        { label: 'Thông báo chưa đọc', value: unreadCount },
      ],
      unreadNotifications: unreadCount,
      upcomingFees,
      recentNotifications,
      upcomingEvents,
      quickActions,
      communityNews,
      financeMini: {
        monthIncome: n(monthIncome._sum.amount),
        monthExpense: n(monthExpense._sum.amount),
        surplus: n(monthIncome._sum.amount) - n(monthExpense._sum.amount),
      },
    };
  }
}

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
class DashboardController {
  constructor(private readonly svc: DashboardService) {}

  @Get()
  overview(@CurrentUser() user: any) {
    return this.svc.overview(user.sub, user.buildingId);
  }
}

@Module({
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
