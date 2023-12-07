import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Controller } from './v1/v1.controller';
import { V1Service } from './v1/v1.service';
import { V1Module } from './v1/v1.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateEntity } from './script/CreateEntity.script';
import { CreateService } from './script/CreateService.script';
@Module({
  imports: [
    // CreateEntity,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    V1Module,
  ],
  controllers: [AppController, V1Controller],
  providers: [AppService, V1Service, CreateEntity, CreateService],
})
export class AppModule {}
