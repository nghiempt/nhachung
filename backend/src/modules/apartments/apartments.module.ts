import { Module, Injectable, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Injectable()
class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async myApartment(userId: string) {
    const res = await this.prisma.apartmentResident.findFirst({
      where: { userId },
      orderBy: [{ role: 'asc' }, { startDate: 'asc' }],
      include: {
        apartment: {
          include: {
            building: true,
            block: true,
            residents: { include: { user: { select: { id: true, fullName: true, avatar: true, role: true } } } },
            familyMembers: true,
            feeSchedules: { orderBy: { dueDate: 'desc' } },
          },
        },
      },
    });
    if (!res) return null;

    const apt = res.apartment;
    const payments = await this.prisma.payment.findMany({
      where: { feeSchedule: { apartmentId: apt.id } },
      orderBy: { paidAt: 'desc' },
      take: 10,
      include: { feeSchedule: true },
    });
    return { ...apt, recentPayments: payments };
  }

  byId(id: string) {
    return this.prisma.apartment.findUnique({
      where: { id },
      include: {
        building: true,
        block: true,
        residents: { include: { user: true } },
        familyMembers: { include: { vehicles: true, documents: true } },
        feeSchedules: true,
      },
    });
  }
}

@ApiTags('apartments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('apartments')
class ApartmentsController {
  constructor(private readonly svc: ApartmentsService) {}

  @Get('me')
  me(@CurrentUser('sub') userId: string) {
    return this.svc.myApartment(userId);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.svc.byId(id);
  }
}

@Module({
  providers: [ApartmentsService],
  controllers: [ApartmentsController],
})
export class ApartmentsModule {}
