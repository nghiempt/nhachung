import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        apartments: { include: { apartment: { include: { building: true, block: true } } } },
        settings: true,
        identityDocs: true,
        linkedAccounts: true,
        devices: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const { passwordHash: _, ...safe } = user;
    return safe;
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    const primaryApt = user.apartments.find((r) => r.role === 'PRIMARY') || user.apartments[0];

    const familyMembers = primaryApt
      ? await this.prisma.familyMember.findMany({
          where: { apartmentId: primaryApt.apartmentId },
          include: { vehicles: true, documents: true },
        })
      : [];

    const vehicles = familyMembers.flatMap((m) => m.vehicles);

    const recentActivity = await this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return {
      ...user,
      primaryApartment: primaryApt?.apartment,
      vehicles,
      recentActivity,
    };
  }

  async updateProfile(userId: string, data: { fullName?: string; phone?: string; dob?: Date; gender?: any; avatar?: string }) {
    const { passwordHash: _, ...user } = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    return user;
  }
}
