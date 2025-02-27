import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://127.0.0.1:5500', 'http://103.198.174.200'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
