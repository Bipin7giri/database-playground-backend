import { InternalServerErrorException } from '@nestjs/common';
import { TableDetails } from '../v1/DTO/createModule.dto';
import * as fs from 'fs';
import Capitalized from '../utils/capitalized';

// ${item?.dataType == 'text' && '@IsString()'}
// ${item?.dataType == 'integer' && '@IsNumber()'}
export class CreateDto {
  create(tableDescription: TableDetails[], name: string) {
    try {
      const CapitalizeFolderName = Capitalized(name);

      const dtoContent = `import { IsNotEmpty, IsOptional } from 'class-validator';
      import { ApiProperty } from '@nestjs/swagger';

      export class Create${CapitalizeFolderName}Dto {
      ${tableDescription
        .map((item) => {
          return `
            @ApiProperty()
            ${item?.isOptional ? '@IsOptional()' : '@IsNotEmpty()'}
           
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
