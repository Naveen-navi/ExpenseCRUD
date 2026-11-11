import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ExpenseModule } from './expense/expense.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense/entities/expense.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { User } from './auth/entities/user.entity.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'Expense-CRUD',
      entities: [Expense, User], //Array of entities that we need to register
      synchronize: true, //Only used in dev mode
    }),
    
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'expense-practice1',
    }),
    ExpenseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
