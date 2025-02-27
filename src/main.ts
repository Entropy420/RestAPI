import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Get the underlying Express instance
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);

  // Enhanced CORS configuration with callback and logging
  app.enableCors({
    origin: (origin, callback) => {
      // List of allowed origins (can be extended)
      const allowedOrigins = [
        'https://abc.com',
        'https://www.abc.com', // Optional: Include WWW version if needed
      ];

      // Log incoming origin for debugging
      console.log('Incoming request from origin:', origin);

      // Allow requests with no origin (curl, postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowed list
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        return origin === allowedOrigin || origin.startsWith(allowedOrigin);
      });

      // Explicitly show validation result in logs
      console.log(`Origin ${origin} is ${isAllowed ? 'allowed' : 'blocked'}`);

      // Return CORS policy decision
      callback(null, isAllowed);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need cookies/auth headers
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running on ${await app.getUrl()}`);
}
bootstrap();
