import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,

    //We need to register JWT module 
    JwtModule.register({ })
],
  controllers: [AuthController],
  providers: [AuthService], //implement JWT strategy, and also roles gaurd
  exports : [AuthService]
})
export class AuthModule {}
