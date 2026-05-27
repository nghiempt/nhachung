import { Module, Injectable, Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class SendMessageDto {
  @IsString() content!: string;
}

@Injectable()
class AiAssistantService {
  constructor(private readonly prisma: PrismaService) {}

  async listConversations(userId: string) {
    return this.prisma.aIConversation.findMany({
      where: { userId, deletedAt: null },
      orderBy: { lastMessageAt: 'desc' },
      take: 20,
    });
  }

  async getConversation(id: string) {
    return this.prisma.aIConversation.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
  }

  async createConversation(userId: string, initialMessage: string) {
    const title = initialMessage.slice(0, 60);
    const conv = await this.prisma.aIConversation.create({
      data: { userId, title, messageCount: 1 },
    });
    await this.prisma.aIMessage.create({
      data: { conversationId: conv.id, role: 'USER', content: initialMessage },
    });
    return conv;
  }

  async sendMessage(conversationId: string, dto: SendMessageDto) {
    const userMsg = await this.prisma.aIMessage.create({
      data: { conversationId, role: 'USER', content: dto.content },
    });
    // Stub assistant reply (real impl would call OpenAI/Gemini)
    const reply = await this.prisma.aIMessage.create({
      data: {
        conversationId,
        role: 'ASSISTANT',
        content: `Tôi đã nhận câu hỏi của bạn: "${dto.content}". Hệ thống đang được tích hợp với LLM. Xin tạm thời tham khảo Kho tài liệu hoặc liên hệ BQT theo hotline 1900 1234.`,
        modelUsed: 'stub',
      },
    });
    await this.prisma.aIConversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date(), messageCount: { increment: 2 } },
    });
    return { userMsg, reply };
  }
}

@ApiTags('ai-assistant')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai-assistant')
class AiAssistantController {
  constructor(private readonly svc: AiAssistantService) {}

  @Get('conversations')
  list(@CurrentUser('sub') userId: string) {
    return this.svc.listConversations(userId);
  }

  @Get('conversations/:id')
  byId(@Param('id') id: string) {
    return this.svc.getConversation(id);
  }

  @Post('conversations')
  create(@CurrentUser('sub') userId: string, @Body() dto: SendMessageDto) {
    return this.svc.createConversation(userId, dto.content);
  }

  @Post('conversations/:id/messages')
  send(@Param('id') id: string, @Body() dto: SendMessageDto) {
    return this.svc.sendMessage(id, dto);
  }
}

@Module({
  providers: [AiAssistantService],
  controllers: [AiAssistantController],
})
export class AiAssistantModule {}
