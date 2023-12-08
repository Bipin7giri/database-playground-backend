import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import createModule from 'src/components/modules/createModule';
import { CreateEntity } from 'src/script/CreateEntity.script';
import { TableDetails } from './DTO/createModule.dto';
import { CreateService } from 'src/script/CreateService.script';
import { CreateDto } from 'src/script/CreateDto.script';
import { CreateController } from 'src/script/CreateController.script';
@Injectable()
export class V1Service {
  constructor(
    private readonly createEntity: CreateEntity,
    private readonly createService: CreateService,
    private readonly createDto: CreateDto,
    private readonly createController: CreateController,
  ) {}
  createResources(folderName: string, tableDescription: TableDetails[]): string {
    exec(`nest g resource ${folderName}`, (error) => {
      if (error) {
        throw new InternalServerErrorException(error.message);
      } else {
        this.createEntity.create(tableDescription, folderName);
        this.createController.create(folderName);
        this.createService.create(folderName);
        this.createDto.create(tableDescription, folderName);
      }

      const modulePath = `src/${folderName}/${folderName}.module.ts`;
      const moduleContent = createModule(folderName);

      fs.writeFile(modulePath, moduleContent, (err) => {
        if (err) {
          throw new InternalServerErrorException(err.message);
        }
        console.log(`Folder "${folderName}" created successfully.`);
      });
    });

    return 'Successful';
  }
}
