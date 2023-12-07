import Capitalized from 'src/utils/capitalized';
import { TableDetails } from 'src/v1/DTO/createModule.dto';
import * as fs from 'fs';
import { InternalServerErrorException } from '@nestjs/common';
export class CreateEntity {
  async create(tableDescription: TableDetails[], name: string) {
    try {
      const CapitalizeFolderName = Capitalized(name);
      const entityContent: string = `import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
      @Entity('${name}')
      export class ${CapitalizeFolderName}Entity {
        @PrimaryGeneratedColumn()
        id: number;
        
        ${tableDescription
          .map((item: TableDetails) => {
            return `
          @Column({ nullable: true })
          ${item.columnName}:${item.dataType};`;
          })
          .join('')}
      }`;
      const entityPath = `src/${name}/entities/${name}.entity.ts`;
      fs.writeFile(entityPath, entityContent, (err) => {
        if (err) {
          throw new InternalServerErrorException(err.message);
        }
        console.log(`Folder "${this}" created successfully.`);
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
