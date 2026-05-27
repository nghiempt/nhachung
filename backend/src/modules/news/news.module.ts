import { Module, Injectable, Controller, Get, Param, Query, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NewsCategory } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class CreateNewsDto {
  @IsString() title!: string;
  @IsString() summary!: string;
  @IsString() content!: string;
  @IsEnum(NewsCategory) category!: NewsCategory;
  @IsOptional() @IsString() thumbnail?: string;
}

@Injectable()
class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(buildingId: string, opts: { category?: NewsCategory; tab?: string }) {
    const where: any = { buildingId, deletedAt: null };
    if (opts.category) where.category = opts.category;

    const featured = await this.prisma.newsPost.findFirst({
      where: { ...where, isFeatured: true },
      orderBy: { publishedAt: 'desc' },
      include: { author: { select: { id: true, fullName: true, avatar: true } } },
    });

    const posts = await this.prisma.newsPost.findMany({
      where: { ...where, id: featured ? { not: featured.id } : undefined },
      orderBy: { publishedAt: 'desc' },
      take: 30,
      include: { author: { select: { id: true, fullName: true, avatar: true } } },
    });

    // Tabs counts
    const all = await this.prisma.newsPost.count({ where: { buildingId, deletedAt: null } });
    const byCat = await this.prisma.newsPost.groupBy({
      by: ['category'],
      where: { buildingId, deletedAt: null },
      _count: { _all: true },
    });
    const tabs = {
      all,
      ...Object.fromEntries(byCat.map((c) => [c.category, c._count._all])),
    };

    // Sidebar widgets
    const hotTopics = await this.prisma.newsPost.findMany({
      where: { buildingId, deletedAt: null },
      orderBy: { viewCount: 'desc' },
      take: 3,
      select: { id: true, title: true, viewCount: true },
    });
    const upcomingEvents = await this.prisma.communityEvent.findMany({
      where: { buildingId, status: 'UPCOMING' },
      orderBy: { eventDate: 'asc' },
      take: 4,
    });

    return { featured, posts, tabs, hotTopics, upcomingEvents };
  }

  byId(id: string) {
    return this.prisma.newsPost.findUnique({
      where: { id },
      include: { author: { select: { id: true, fullName: true, avatar: true } } },
    });
  }

  async create(buildingId: string, authorId: string, dto: CreateNewsDto) {
    return this.prisma.newsPost.create({
      data: {
        buildingId,
        authorId,
        ...dto,
        slug: dto.title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 80) + '-' + Date.now(),
      },
    });
  }
}

@ApiTags('news')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('news')
class NewsController {
  constructor(private readonly svc: NewsService) {}

  @Get()
  list(@CurrentUser() user: any, @Query('category') category?: NewsCategory) {
    return this.svc.list(user.buildingId, { category });
  }

  @Get('events/upcoming')
  upcoming(@CurrentUser() user: any) {
    return this.svc.list(user.buildingId, {}).then((r) => r.upcomingEvents);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.svc.byId(id);
  }

  @Roles('BOARD_MEMBER')
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateNewsDto) {
    return this.svc.create(user.buildingId, user.sub, dto);
  }
}

@Module({
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
