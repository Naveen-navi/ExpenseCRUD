import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Expense } from "../../expense/entities/expense.entity.js";
import { create } from "domain";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    email : string;

    @Column()
    name : string;

    @Column()
    password : string; //hash the password

    @Column({
        type : 'enum',
        enum : UserRole,
        default : UserRole.USER
    })
    role : UserRole;

    @OneToMany(() => Expense, (expense) => expense.userName) //Getting the relation with user 
    expenses : Expense[];

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;
}
