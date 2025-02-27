import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { LoggerMid } from './logger/logger';
import { EmployeesController } from './employees/employees.controller';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('Middleware LoggerMid');
    consumer
      .apply(LoggerMid)
      // .forRoutes({ path: 'api/*path', method: RequestMethod.ALL });
      // .forRoutes({ path: 'employees/*path', method: RequestMethod.ALL });

      .forRoutes(EmployeesController);
  }
}
