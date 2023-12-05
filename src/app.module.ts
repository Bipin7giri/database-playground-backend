import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Controller } from './v1/v1.controller';
import { V1Service } from './v1/v1.service';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [V1Module],
  controllers: [AppController, V1Controller],
  providers: [AppService, V1Service],
})
export class AppModule {}
