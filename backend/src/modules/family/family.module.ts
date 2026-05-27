import { Module, Injectable, Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FamilyRelation, FamilyVerificationStatus, Gender, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class CreateFamilyMemberDto {
  @IsString() apartmentId!: string;
  @IsString() fullName!: string;
  @IsEnum(FamilyRelation) relation!: FamilyRelation;
  @IsOptional() @IsString() cccd?: string;
  @IsOptional() dob?: string;
  @IsOptional() @IsEnum(Gender) gender?: Gender;
  @IsOptional() @IsString() occupation?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() email?: string;
}

class UpdateFamilyMemberDto {
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsEnum(FamilyRelation) relation?: FamilyRelation;
  @IsOptional() @IsString() cccd?: string;
  @IsOptional() dob?: string;
  @IsOptional() @IsEnum(Gender) gender?: Gender;
  @IsOptional() @IsString() occupation?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEnum(FamilyVerificationStatus) verificationStatus?: FamilyVerificationStatus;
}

const MAX_MEMBERS_PER_APARTMENT = 6;

@Injectable()
class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async listByApartment(apartmentId: string) {
    const members = await this.prisma.familyMember.findMany({
      where: { apartmentId, deletedAt: null },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
      include: { vehicles: true, documents: true },
    });

    const stats = {
      total: members.length,
      maxSlots: MAX_MEMBERS_PER_APARTMENT,
      verified: members.filter((m) => m.verificationStatus === 'VERIFIED').length,
      pending: members.filter((m) => m.verificationStatus === 'PENDING').length,
      temporary: members.filter((m) => m.verificationStatus === 'TEMPORARY').length,
    };

    return { stats, members };
  }

  async myFamily(userId: string) {
    const primary = await this.prisma.apartmentResident.findFirst({
      where: { userId },
      orderBy: { role: 'asc' },
    });
    if (!primary) return { stats: { total: 0, maxSlots: MAX_MEMBERS_PER_APARTMENT, verified: 0, pending: 0, temporary: 0 }, members: [] };
    return this.listByApartment(primary.apartmentId);
  }

  async create(userId: string, dto: CreateFamilyMemberDto) {
    // RBAC: only PRIMARY of that apartment can add (or board member)
    const res = await this.prisma.apartmentResident.findFirst({
      where: { apartmentId: dto.apartmentId, userId },
    });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ForbiddenException();
    if (user.role !== 'BOARD_MEMBER' && res?.role !== 'PRIMARY') {
      throw new ForbiddenException('Only the primary resident can add family members');
    }

    const count = await this.prisma.familyMember.count({ where: { apartmentId: dto.apartmentId, deletedAt: null } });
    if (count >= MAX_MEMBERS_PER_APARTMENT) {
      throw new BadRequestException(`Each apartment is limited to ${MAX_MEMBERS_PER_APARTMENT} members`);
    }

    return this.prisma.familyMember.create({
      data: {
        ...dto,
        dob: dto.dob ? new Date(dto.dob) : null,
      } as Prisma.FamilyMemberUncheckedCreateInput,
    });
  }

  async update(id: string, dto: UpdateFamilyMemberDto) {
    return this.prisma.familyMember.update({
      where: { id },
      data: { ...dto, dob: dto.dob ? new Date(dto.dob) : undefined },
    });
  }

  async remove(id: string) {
    return this.prisma.familyMember.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

@ApiTags('family')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('family')
class FamilyController {
  constructor(private readonly svc: FamilyService) {}

  @Get('me')
  myFamily(@CurrentUser('sub') userId: string) {
    return this.svc.myFamily(userId);
  }

  @Get('apartment/:apartmentId')
  byApartment(@Param('apartmentId') id: string) {
    return this.svc.listByApartment(id);
  }

  @Post()
  create(@CurrentUser('sub') userId: string, @Body() dto: CreateFamilyMemberDto) {
    return this.svc.create(userId, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFamilyMemberDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}

@Module({
  providers: [FamilyService],
  controllers: [FamilyController],
})
export class FamilyModule {}
