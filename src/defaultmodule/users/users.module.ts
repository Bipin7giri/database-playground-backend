import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User, UserCredential } from '../../AllEntites/index';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { HashService } from '../../helper/hash.services';
import { ImageUploadSerive } from '../../imageupload.service';
import { AuthService } from '../../auth/auth.service';
import { LocalStrategy } from '../../auth/local.strategy';
import { JwtStrategy } from '../../auth/jwt.strategy';
import multer from 'multer';
import * as dotenv from 'dotenv';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserCredential]),
    MulterModule.register({
      storage: multer?.memoryStorage(),
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    ImageUploadSerive,
  ],
})
export class UsersModule {}
