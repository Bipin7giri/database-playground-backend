import { Module } from '@nestjs/common';
import { V1Controller } from './v1.controller';
import { V1Service } from './v1.service';
import { CreateEntity } from '../script/CreateEntity.script';
import { CreateService } from '../script/CreateService.script';
import { CreateDto } from '../script/CreateDto.script';
import { CreateController } from '../script/CreateController.script';

@Module({
  imports: [],
  controllers: [V1Controller],
  providers: [V1Service, CreateEntity, CreateController, CreateService, CreateDto],
})
export class V1Module {}
