import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../defaultmodule/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'test',
      secretOrPrivateKey: 'test',
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
