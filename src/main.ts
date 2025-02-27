import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Get the underlying Express instance
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true); // Enable trust proxy

  app.enableCors({
    origin: 'https://abc.com',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
