import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, SignupDto, RefreshDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    let buildingId: string | undefined;
    let apartmentId: string | undefined;
    if (dto.invitationCode) {
      const inv = await this.prisma.invitationCode.findUnique({ where: { code: dto.invitationCode } });
      if (!inv || (inv.expiresAt && inv.expiresAt < new Date())) {
        throw new BadRequestException('Invalid or expired invitation code');
      }
      buildingId = inv.buildingId;
      apartmentId = inv.apartmentId ?? undefined;
    }

    const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);
    const passwordHash = await bcrypt.hash(dto.password, rounds);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        fullName: dto.fullName,
        role: 'RESIDENT',
      },
    });

    if (apartmentId) {
      await this.prisma.apartmentResident.create({
        data: { apartmentId, userId: user.id, role: 'SECONDARY' },
      });
    }

    await this.prisma.invitationCode.updateMany({
      where: { code: dto.invitationCode ?? '__none__' },
      data: { usedById: user.id, usedAt: new Date() },
    });

    return this.issueTokens(user.id, user.email, user.role, buildingId);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || user.deletedAt) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const primaryApt = await this.prisma.apartmentResident.findFirst({
      where: { userId: user.id },
      include: { apartment: true },
    });
    const buildingId = primaryApt?.apartment.buildingId;

    return this.issueTokens(user.id, user.email, user.role, buildingId);
  }

  async refresh(dto: RefreshDto) {
    let payload: any;
    try {
      payload = await this.jwt.verifyAsync(dto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenHash = this.hashToken(dto.refreshToken);
    const stored = await this.prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token revoked or expired');
    }

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokens(payload.sub, payload.email, payload.role, payload.buildingId);
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return { success: true };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        apartments: { include: { apartment: { include: { building: true, block: true } } } },
        settings: true,
        identityDocs: true,
      },
    });
    if (!user) throw new UnauthorizedException();
    const { passwordHash: _ph, ...safe } = user;
    return safe;
  }

  private async issueTokens(userId: string, email: string, role: string, buildingId?: string) {
    const payload = { sub: userId, email, role, buildingId };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    const refreshTtlDays = parseInt(String(process.env.JWT_REFRESH_EXPIRES_IN || '7d').replace('d', ''), 10) || 7;
    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: this.hashToken(refreshToken),
        expiresAt: new Date(Date.now() + refreshTtlDays * 86400_000),
      },
    });

    return { accessToken, refreshToken, tokenType: 'Bearer' };
  }

  private hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
