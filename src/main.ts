import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Get the underlying Express instance
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);

  // Enhanced CORS configuration with callback and logging
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running on ${await app.getUrl()}`);
}
bootstrap();
