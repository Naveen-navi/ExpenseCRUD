import { IsNotEmpty, IsNumber, IsString, MinLength, minLength } from "class-validator";

export class createExpenseDto {

    @IsNotEmpty({message : "Bill Number cannot be empty"})
    @IsString({message : "Bill Number should be a string"})
    @MinLength(3, {message : "Minimum length of bill number should be 3"})
    billNumber : string;

    @IsNotEmpty({message : "Username cannot be empty"})
    @IsString({message : "Username should be a string"})
    userName : string;

    @IsNotEmpty({message : "Bill Amount cannot be empty"})
    @IsNumber({}, { message: "Bill Amount should be a number" })
    billAmount : number;

    @IsNotEmpty({message : "Claimed Amount cannot be empty"})
    @IsNumber({}, { message: "Claimed Amount should be a number" })
    claimedAmount : number;

}
