import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { RegisterDto } from './entities/dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './entities/dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) //User - Entity
        private userRepository : Repository<User>,
        private jwtService : JwtService
    ){}

    async registerUser(registerDto : RegisterDto){
        const exixtingUser = await this.userRepository.findOne({
            where : {email : registerDto.email}
        })

        if(exixtingUser){
            throw new ConflictException('Userr with this email already exists')
        }

        const hashedPwd = await this.hashPassword(registerDto.password);

        const newUser = this.userRepository.create({
            email : registerDto.email,
            name : registerDto.name,
            password : hashedPwd,
            role : UserRole.USER
        })

        const savedUser = await this.userRepository.save(newUser);
        const {password, ...result} = savedUser; // To exclude the password from the response, we can use destructuring to separate the password property from the rest of the user object. The ...result syntax collects all other properties of savedUser into a new object called result, which does not include the password. This way, when we return result, it will contain all user information except for the password, enhancing security by not exposing sensitive data.
        //and using spread operator to return the rest of the properties of the savedUser object without the password. This is a common practice to avoid sending sensitive information like passwords in API responses.
        return {
            user : result,
            message : "User registered successfully"
        }
    }

    private async hashPassword(password : string) :  Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async loginUser(loginDto : LoginDto){

        const user = await this.userRepository.findOne({
            where : {email : loginDto.email}
        })

        if(!user || !(await this.verifyPwd(loginDto.password, user.password))){
            throw new UnauthorizedException('Invalid email or password');
        }

        const tokens = this.generateTokens(user);
        const {password, ...result} = user; // Exclude the password from the response
        return {
            user : result,
            ...tokens
        }
    }

    async refreshToken(refreshToken : string) {
        try{
            const payload = this.jwtService.verify(refreshToken, {
                secret : 'refresh_secret'
            })

            const user = await this.userRepository.findOne({
                where : {id : payload.sub}
            })

            if(!user){
                throw new UnauthorizedException('User not found');
            }

            const accessToken = this.generateAccessToken(user);
            return {
                accessToken
            }

        }catch(e){
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private async verifyPwd(plainPwd : string, hashedPwd : string) :Promise<boolean> {
        return bcrypt.compare(plainPwd, hashedPwd);
    }

    private generateTokens(user : User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user)
        };
    }

    private generateAccessToken(user : User): string {

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        return this.jwtService.sign(payload, {
            secret : 'jwt_secret',
            expiresIn: '15m', // Access token expiration time

        })
    }

    private generateRefreshToken(user : User): string {
        const payload = {
            sub: user.id,
        }

        return this.jwtService.sign(payload, {
            secret : 'refresh_secret',
            expiresIn: '7d', // Refresh token expiration time

        })

    }

}
