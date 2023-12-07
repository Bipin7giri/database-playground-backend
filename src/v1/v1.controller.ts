import { Controller, Get, Param } from '@nestjs/common';
import { V1Service } from './v1.service';

@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  @Get(':folderName')
  findAll(@Param('folderName') folderName: string): string {
    return this.v1Service.createResources(folderName);
  }
}
