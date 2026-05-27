import { Module, Injectable, Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationType, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Injectable()
class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(userId: string, filter?: { type?: NotificationType; unreadOnly?: boolean }) {
    const where: Prisma.UserNotificationWhereInput = { userId };
    if (filter?.unreadOnly) where.readAt = null;
    if (filter?.type) where.notification = { type: filter.type };

    const items = await this.prisma.userNotification.findMany({
      where,
      orderBy: { notification: { publishedAt: 'desc' } },
      take: 100,
      include: { notification: true },
    });

    // Group by date bucket (today / yesterday / this week)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday.getTime() - 86400_000);
    const startOfWeek = new Date(startOfToday.getTime() - 7 * 86400_000);

    const buckets: Record<string, any[]> = { today: [], yesterday: [], thisWeek: [], earlier: [] };
    for (const it of items) {
      const t = it.notification.publishedAt.getTime();
      if (t >= startOfToday.getTime()) buckets.today.push(it);
      else if (t >= startOfYesterday.getTime()) buckets.yesterday.push(it);
      else if (t >= startOfWeek.getTime()) buckets.thisWeek.push(it);
      else buckets.earlier.push(it);
    }

    const unreadCount = await this.prisma.userNotification.count({ where: { userId, readAt: null } });

    return { unreadCount, buckets, items };
  }

  async countByCategory(userId: string) {
    const grouped = await this.prisma.userNotification.findMany({
      where: { userId },
      include: { notification: { select: { type: true } } },
    });
    const counts: Record<string, number> = {};
    for (const g of grouped) counts[g.notification.type] = (counts[g.notification.type] || 0) + 1;
    return counts;
  }

  async markRead(userId: string, id: string) {
    return this.prisma.userNotification.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  async markAllRead(userId: string) {
    await this.prisma.userNotification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
    return { success: true };
  }

  byId(id: string) {
    return this.prisma.userNotification.findUnique({ where: { id }, include: { notification: true } });
  }
}

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get()
  list(@CurrentUser('sub') userId: string, @Query('type') type?: NotificationType, @Query('unreadOnly') unreadOnly?: string) {
    return this.svc.listForUser(userId, { type, unreadOnly: unreadOnly === 'true' });
  }

  @Get('counts')
  counts(@CurrentUser('sub') userId: string) {
    return this.svc.countByCategory(userId);
  }

  @Post('mark-all-read')
  markAll(@CurrentUser('sub') userId: string) {
    return this.svc.markAllRead(userId);
  }

  @Post(':id/read')
  markOne(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.svc.markRead(userId, id);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.svc.byId(id);
  }
}

@Module({
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
