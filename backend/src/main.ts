import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('Bootstrap');

  const port = process.env.PORT || 4000;
  const prefix = process.env.API_PREFIX || 'api/v1';
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

  app.setGlobalPrefix(prefix);
  app.use(helmet());
  app.enableCors({
    origin: corsOrigin.split(','),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Nhà Chung API')
    .setDescription('Apartment management platform — REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/docs`, app, document);

  await app.listen(port);
  logger.log(`🚀 Nhà Chung backend running on http://localhost:${port}/${prefix}`);
  logger.log(`📚 Swagger docs: http://localhost:${port}/${prefix}/docs`);
}
bootstrap();
