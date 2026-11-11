import { Injectable, NotFoundException } from "@nestjs/common";
// import { Expense } from "./interfaces/expense.interface.js";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { createExpenseDto } from "./dto/createExpense.dto.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./entities/expense.entity.js";
import { updateExpenseDto } from "./dto/updateExpense.dto.js";

@Injectable()
export class ExpenseService {

    constructor(
        @InjectRepository(Expense)
        private expenseRepository : Repository<Expense>
    ){}

    // private expense : Expense[] = [
    //     {
    //         id : 1,
    //         billNumber : "BILL-001",
    //         billAmount : 1000,
    //         claimedAmount : 800,
    //         createdAt : new Date()
    //     }
    // ]
  
    async getExpense() : Promise<Expense[]>{
        return this.expenseRepository.find();
    }

    async getSingleExpense(id : number) : Promise<Expense> {
        // return await this.expenseRepository.findOne({ where: { id } });

        const singleExpense = await this.expenseRepository.findOneBy({id})
        if (!singleExpense) {
            throw new NotFoundException(`Expense with ID ${id} not found`);
        }
        return singleExpense;
    }

    async createExpense(createExpense : createExpenseDto) : Promise<Expense> {
        const newExpense = this.expenseRepository.create({
            userName : createExpense.userName,
            billNumber : createExpense.billNumber,
            billAmount : createExpense.billAmount,
            claimedAmount : createExpense.claimedAmount,
        })

        return this.expenseRepository.save(newExpense);
    }

    async updateExpense(id :number, updateExpense : updateExpenseDto) : Promise<Expense> {
        const expenseToUpdate = await this.getSingleExpense(id);
        
        if (updateExpense.billNumber !== undefined) {
            expenseToUpdate.billNumber = updateExpense.billNumber;
        }

        if (updateExpense.userName !== undefined) {
            expenseToUpdate.userName = updateExpense.userName;
        }
        if (updateExpense.billAmount !== undefined) {
            expenseToUpdate.billAmount = updateExpense.billAmount;
        }
        if (updateExpense.claimedAmount !== undefined) {
            expenseToUpdate.claimedAmount = updateExpense.claimedAmount;
        }

        return this.expenseRepository.save(expenseToUpdate);
    }

    async deleteExpense(id: number) : Promise<void> {
        const expenseToDelete = await this.getSingleExpense(id);

        await this.expenseRepository.remove(expenseToDelete);
    }

}