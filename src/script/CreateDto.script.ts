import { InternalServerErrorException } from '@nestjs/common';
import { TableDetails } from 'src/v1/DTO/createModule.dto';
import * as fs from 'fs';
import Capitalized from 'src/utils/capitalized';

export class CreateDto {
  create(tableDescription: TableDetails[], name: string) {
    try {
      const CapitalizeFolderName = Capitalized(name);
      console.log(tableDescription);
      const dtoContent = `import { IsNotEmpty, IsOptional } from 'class-validator';
      export class Create${CapitalizeFolderName}Dto {
      ${tableDescription
        .map((item) => {
          return `
            ${`${item?.isOptional}` ? '@IsOptional()' : '@IsNotEmpty()'}
            ${item?.columnName}: ${item?.dataType};
            `;
        })
        .join('')}
    }`;

      const dtoPath = `src/${name}/dto/create-${name}.dto.ts`;
      fs.writeFile(dtoPath, dtoContent, (err) => {
        if (err) {
          throw new InternalServerErrorException(err.message);
        }
        console.log(`Folder "${this}" created successfully.`);
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
