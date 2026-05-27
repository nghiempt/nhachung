import { Module, Injectable, Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FeedbackCategory, FeedbackPriority, FeedbackStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class CreateFeedbackDto {
  @IsEnum(FeedbackCategory) category!: FeedbackCategory;
  @IsString() title!: string;
  @IsString() description!: string;
  @IsOptional() @IsEnum(FeedbackPriority) priority?: FeedbackPriority;
}

class ReplyDto {
  @IsString() content!: string;
  @IsOptional() @IsEnum(FeedbackStatus) statusChange?: FeedbackStatus;
}

@Injectable()
class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async list(buildingId: string, status?: FeedbackStatus) {
    const items = await this.prisma.feedback.findMany({
      where: { buildingId, deletedAt: null, status: status ?? undefined },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, fullName: true, avatar: true } } },
    });

    const all = await this.prisma.feedback.count({ where: { buildingId, deletedAt: null } });
    const grouped = await this.prisma.feedback.groupBy({
      by: ['status'],
      where: { buildingId, deletedAt: null },
      _count: { _all: true },
    });
    const tabs = { all, ...Object.fromEntries(grouped.map((g) => [g.status, g._count._all])) };

    return { tabs, items };
  }

  byId(id: string) {
    return this.prisma.feedback.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullName: true, avatar: true } },
        assignee: { select: { id: true, fullName: true, avatar: true } },
        replies: { orderBy: { createdAt: 'asc' }, include: { user: { select: { id: true, fullName: true, avatar: true } } } },
        attachments: true,
        workOrders: { include: { workOrder: true } },
      },
    });
  }

  async create(buildingId: string, userId: string, dto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: { buildingId, userId, ...dto },
    });
  }

  async reply(id: string, userId: string, dto: ReplyDto) {
    const reply = await this.prisma.feedbackReply.create({
      data: { feedbackId: id, userId, content: dto.content, statusChange: dto.statusChange ?? null },
    });
    if (dto.statusChange) {
      await this.prisma.feedback.update({
        where: { id },
        data: { status: dto.statusChange, resolvedAt: dto.statusChange === 'RESOLVED' ? new Date() : null },
      });
    }
    return reply;
  }
}

@ApiTags('feedback')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('feedback')
class FeedbackController {
  constructor(private readonly svc: FeedbackService) {}

  @Get()
  list(@CurrentUser() user: any, @Query('status') status?: FeedbackStatus) {
    return this.svc.list(user.buildingId, status);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.svc.byId(id);
  }

  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateFeedbackDto) {
    return this.svc.create(user.buildingId, user.sub, dto);
  }

  @Post(':id/reply')
  reply(@Param('id') id: string, @CurrentUser('sub') userId: string, @Body() dto: ReplyDto) {
    return this.svc.reply(id, userId, dto);
  }
}

@Module({
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
