import { Controller, Get, Post, Param, Body, ParseIntPipe, UsePipes, HttpCode, HttpStatus, ValidationPipe, Put, Delete } from "@nestjs/common";
import { ExpenseService } from './expense.service.js';
// import { Expense as ExpenseInterface } from "./interfaces/expense.interface.js";
import type { Expense as ExpenseInterface } from "./interfaces/expense.interface.js";
import { createExpenseDto } from "./dto/createExpense.dto.js";
import { Expense as ExpenseEntity} from "./entities/expense.entity.js";
import { updateExpenseDto } from "./dto/updateExpense.dto.js";

@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

//   @Get()
//     getExpense() : ExpenseInterface[] {
//         return this.expenseService.getExpense();
//     }

//     @Get(":id")
//     getSingleExpense(@Param("id", ParseIntPipe) id : number) : ExpenseInterface | string {
//         return this.expenseService.getSingleExpense(id);
//     }

//     @Post()
//     createExpense(@Body() createExpense : createExpenseDto) : ExpenseInterface {
//         return this.expenseService.createExpense(createExpense);
//     }

    @Get()
    async getExpense() : Promise<ExpenseEntity[]> {
        return this.expenseService.getExpense();
    }


    @Get(':id')
    async getSingleExpense(
        @Param('id', ParseIntPipe) id:number, 
    ) : Promise<ExpenseEntity> {
        return this.expenseService.getSingleExpense(id);
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(
        new ValidationPipe({
            whitelist : true,
            forbidNonWhitelisted : true
        }),
    )
    async createExpense(@Body() createExpenseData : createExpenseDto): Promise<ExpenseEntity> {
        return this.expenseService.createExpense(createExpenseData);
    }

    @Put(':id')
    async updateExpense(
        @Param('id', ParseIntPipe) id:number,
        @Body() updateExpenseData : updateExpenseDto,
    ) : Promise<ExpenseEntity> {
        return this.expenseService.updateExpense(id, updateExpenseData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteExpense(@Param('id', ParseIntPipe) id:number) : Promise<void> {
        return this.expenseService.deleteExpense(id);
    }
}
