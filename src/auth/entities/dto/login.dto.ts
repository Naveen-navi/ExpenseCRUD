import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDto {
    @IsEmail({}, {message: 'Please provide a valid email address'})
    email : string;

    @IsNotEmpty({message : "Password cannot be empty"})
    @MinLength(6, {message : "Minimum length of Password should be 6"})
    password : string;
}

