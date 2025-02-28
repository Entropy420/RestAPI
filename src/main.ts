import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.set('trust proxy', true);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running on ${await app.getUrl()}`);
}
bootstrap();
