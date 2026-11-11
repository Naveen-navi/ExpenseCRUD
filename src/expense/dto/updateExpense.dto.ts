import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class updateExpenseDto {

    @IsOptional()
    @IsNotEmpty({message : "Bill Number cannot be empty"})
    @IsString({message : "Bill Number should be a string"})
    @MinLength(3, {message : "Minimum length of bill number should be 3"})
    billNumber ?: string;

    @IsOptional()
    @IsNotEmpty({message : "Username cannot be empty"})
    @IsString({message : "Username should be a string"})
    userName? : string;

    @IsOptional()
    @IsNotEmpty({message : "Bill Amount cannot be empty"})
    @IsNumber({}, { message: "Bill Amount should be a number" })
    billAmount ?: number;

    @IsOptional()
    @IsNotEmpty({message : "Claimed Amount cannot be empty"})
    @IsNumber({}, { message: "Claimed Amount should be a number" })
    claimedAmount ?: number;

}