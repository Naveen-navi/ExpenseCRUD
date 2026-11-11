import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto {
    @IsEmail({}, {message: 'Please provide a valid email address'})
    email : string;

    @IsNotEmpty({message : "Name cannot be empty"})
    @IsString({message : "Name should be a string"})
    @MinLength(5, {message : "Minimum length of name should be 5"})
    name : string;

    @IsNotEmpty({message : "Password cannot be empty"})
    @MinLength(6, {message : "Minimum length of Password should be 6"})
    password : string;
}

