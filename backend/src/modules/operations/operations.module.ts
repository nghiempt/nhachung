import { Module, Injectable, Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { WorkOrderCategory, WorkOrderPriority, WorkOrderStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class CreateWorkOrderDto {
  @IsString() title!: string;
  @IsOptional() @IsString() description?: string;
  @IsEnum(WorkOrderCategory) category!: WorkOrderCategory;
  @IsOptional() @IsEnum(WorkOrderPriority) priority?: WorkOrderPriority;
}

@Injectable()
class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(buildingId: string, status?: WorkOrderStatus) {
    const where = { buildingId, ...(status ? { status } : {}) };

    const all = await this.prisma.workOrder.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { requester: { select: { id: true, fullName: true, avatar: true } } },
    });

    const kpis = {
      open: await this.prisma.workOrder.count({ where: { buildingId, status: 'OPEN' } }),
      inProgress: await this.prisma.workOrder.count({ where: { buildingId, status: 'IN_PROGRESS' } }),
      done: await this.prisma.workOrder.count({ where: { buildingId, status: 'DONE' } }),
      overdue: await this.prisma.workOrder.count({ where: { buildingId, status: 'OVERDUE' } }),
      avgResponseHours: 3.5,
    };

    const tabs = {
      all: await this.prisma.workOrder.count({ where: { buildingId } }),
      OPEN: kpis.open,
      IN_PROGRESS: kpis.inProgress,
      DONE: kpis.done,
      OVERDUE: kpis.overdue,
    };

    const byCategory = await this.prisma.workOrder.groupBy({
      by: ['category'],
      where: { buildingId },
      _count: { _all: true },
    });
    const totalForBreakdown = byCategory.reduce((s, c) => s + c._count._all, 0) || 1;
    const breakdown = byCategory.map((c) => ({
      category: c.category,
      count: c._count._all,
      percent: Math.round((c._count._all / totalForBreakdown) * 1000) / 10,
    }));

    const systems = await this.prisma.technicalSystem.findMany({
      where: { buildingId },
      orderBy: { name: 'asc' },
    });

    const schedule = await this.prisma.maintenanceSchedule.findMany({
      where: { buildingId, scheduledDate: { gte: new Date(Date.now() - 86400_000) } },
      orderBy: { scheduledDate: 'asc' },
      take: 20,
    });

    return { kpis, tabs, workOrders: all, breakdown, systems, schedule };
  }

  byId(id: string) {
    return this.prisma.workOrder.findUnique({
      where: { id },
      include: {
        requester: { select: { id: true, fullName: true, avatar: true } },
        assignee: { select: { id: true, fullName: true, avatar: true } },
        updates: { orderBy: { createdAt: 'desc' }, include: { user: { select: { id: true, fullName: true } } } },
      },
    });
  }

  async create(buildingId: string, requesterId: string, dto: CreateWorkOrderDto) {
    const count = await this.prisma.workOrder.count({ where: { buildingId } });
    const code = `YC-${new Date().toISOString().slice(2, 7).replace('-', '')}-${String(count + 1).padStart(3, '0')}`;
    return this.prisma.workOrder.create({
      data: { buildingId, requesterId, code, ...dto },
    });
  }
}

@ApiTags('operations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('operations')
class OperationsController {
  constructor(private readonly svc: OperationsService) {}

  @Get('overview')
  overview(@CurrentUser() user: any, @Query('status') status?: WorkOrderStatus) {
    return this.svc.overview(user.buildingId, status);
  }

  @Get('work-orders/:id')
  byId(@Param('id') id: string) { return this.svc.byId(id); }

  @Post('work-orders')
  create(@CurrentUser() user: any, @Body() dto: CreateWorkOrderDto) {
    return this.svc.create(user.buildingId, user.sub, dto);
  }
}

@Module({
  providers: [OperationsService],
  controllers: [OperationsController],
})
export class OperationsModule {}
