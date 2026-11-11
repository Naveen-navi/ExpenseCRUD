import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller.js';
import { ExpenseService } from './expense.service.js';
import { Expense } from './entities/expense.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // This will make the Expense repositoty available for injection in the ExpenseService
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule {}
 