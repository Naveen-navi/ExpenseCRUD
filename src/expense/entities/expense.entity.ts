import { truncate } from "fs";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true, nullable : true})
    userName : string;
 
    @Column({length : 50})
    billNumber : string

    @Column()
    billAmount : number;

    @Column()
    claimedAmount : number;

    @CreateDateColumn()
    createdAt : Date;
}