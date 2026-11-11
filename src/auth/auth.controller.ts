import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './entities/dto/register.dto.js';
import { LoginDto } from './entities/dto/login.dto.js';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('register')
    async registerUser(@Body() registerDto : RegisterDto) {
        return this.authService.registerUser(registerDto);
    }

    @Post('login')
    login(@Body() loginDto : LoginDto) {
        return this.authService.loginUser(loginDto);
    }

    @Post('refresh')
    refreshToken(@Body('refreshToken') refreshToken : string){
        return this.authService.refreshToken(refreshToken);
    }
}
