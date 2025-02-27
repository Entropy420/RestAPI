import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Get the underlying Express instance
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true); // Enable trust proxy

  // app.enableCors({
  //   origin: 'https://abc.com',
  // });

  app.enableCors({
    origin: (origin, callback) => {
      if (origin === 'https://abc.com') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
