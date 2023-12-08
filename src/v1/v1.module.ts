import { Module } from '@nestjs/common';
import { V1Controller } from './v1.controller';
import { V1Service } from './v1.service';
import { CreateEntity } from 'src/script/CreateEntity.script';
import { CreateService } from 'src/script/CreateService.script';
import { CreateDto } from 'src/script/CreateDto.script';
import { CreateController } from 'src/script/CreateController.script';

@Module({
  imports: [],
  controllers: [V1Controller],
  providers: [V1Service, CreateEntity, CreateController, CreateService, CreateDto],
})
export class V1Module {}
