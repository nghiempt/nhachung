import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { ApartmentsModule } from './modules/apartments/apartments.module';
import { FamilyModule } from './modules/family/family.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FinanceModule } from './modules/finance/finance.module';
import { MaintenanceFundModule } from './modules/maintenance-fund/maintenance-fund.module';
import { OperationsModule } from './modules/operations/operations.module';
import { KpiModule } from './modules/kpi/kpi.module';
import { ReportsModule } from './modules/reports/reports.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { NewsModule } from './modules/news/news.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { SettingsModule } from './modules/settings/settings.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BuildingsModule,
    ApartmentsModule,
    FamilyModule,
    NotificationsModule,
    FinanceModule,
    MaintenanceFundModule,
    OperationsModule,
    KpiModule,
    ReportsModule,
    DocumentsModule,
    NewsModule,
    FeedbackModule,
    AiAssistantModule,
    SettingsModule,
    DashboardModule,
  ],
})
export class AppModule {}
