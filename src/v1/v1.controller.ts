import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { V1Service } from './v1.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateModuleDto } from './DTO/createModule.dto';

@ApiTags('v1')
@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  @Post('')
  @UsePipes(ValidationPipe)
  create(@Body() createModuleDto: CreateModuleDto): any {
    console.log(createModuleDto);
    return this.v1Service.createResources(createModuleDto.name, createModuleDto.tableDetails);
  }
}
