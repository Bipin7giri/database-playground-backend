import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import createEntity from 'src/components/entities/normalEntity';
import createModule from 'src/components/modules/createModule';
@Injectable()
export class V1Service {
  createResources(folderName: string): string {
    exec(`nest g resource ${folderName}`, (error) => {
      if (error) {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description: 'Some error description',
        });
      } else {
        const entityContent = createEntity(folderName);
        const entityPath = `src/${folderName}/entities/${folderName}.entity.ts`;
        fs.writeFile(entityPath, entityContent, (err) => {
          if (err) {
            throw new BadRequestException('Something bad happened', {
              cause: new Error(),
              description: 'Some error description',
            });
          }

          console.log(`Folder "${folderName}" created successfully.`);
        });
      }

      const modulePath = `src/${folderName}/${folderName}.module.ts`;
      const moduleContent = createModule(folderName);

      fs.writeFile(modulePath, moduleContent, (err) => {
        if (err) {
          throw new BadRequestException('Something bad happened', {
            cause: new Error(),
            description: 'Some error description',
          });
        }
        console.log(`Folder "${folderName}" created successfully.`);
      });
    });

    return 'Successful';
  }
}
