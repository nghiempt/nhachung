import { Module, Injectable, Controller, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class UpdateSettingsDto {
  @IsOptional() notifPreferences?: any;
  @IsOptional() @IsString() language?: string;
  @IsOptional() @IsString() timezone?: string;
  @IsOptional() @IsString() dateFormat?: string;
  @IsOptional() @IsBoolean() twoFactorEnabled?: boolean;
  @IsOptional() privacy?: any;
}

@Injectable()
class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    let settings = await this.prisma.userSettings.findUnique({ where: { userId } });
    if (!settings) {
      settings = await this.prisma.userSettings.create({ data: { userId } });
    }
    const devices = await this.prisma.userDevice.findMany({
      where: { userId },
      orderBy: { lastLoginAt: 'desc' },
    });
    const linked = await this.prisma.userLinkedAccount.findMany({ where: { userId } });
    return { settings, devices, linkedAccounts: linked };
  }

  async update(userId: string, dto: UpdateSettingsDto) {
    return this.prisma.userSettings.upsert({
      where: { userId },
      create: { userId, ...dto },
      update: dto,
    });
  }

  async signoutDevice(userId: string, deviceId: string) {
    await this.prisma.userDevice.deleteMany({ where: { id: deviceId, userId } });
    return { success: true };
  }
}

@ApiTags('settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('settings')
class SettingsController {
  constructor(private readonly svc: SettingsService) {}

  @Get()
  get(@CurrentUser('sub') userId: string) { return this.svc.get(userId); }

  @Patch()
  update(@CurrentUser('sub') userId: string, @Body() dto: UpdateSettingsDto) {
    return this.svc.update(userId, dto);
  }

  @Delete('devices/:id')
  signout(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.svc.signoutDevice(userId, id);
  }
}

@Module({
  providers: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
