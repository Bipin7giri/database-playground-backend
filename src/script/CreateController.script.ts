import Capitalized from '../utils/capitalized';
import * as fs from 'fs';
import { InternalServerErrorException } from '@nestjs/common';

export class CreateController {
  private readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  async create(name: string) {
    try {
      const fileName: string = name;
      const fileNameCapitalized = Capitalized(name);
      const controllerContent: string = `import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ${fileNameCapitalized}Service } from './${fileName}.service';
import { Create${fileNameCapitalized}Dto } from './dto/create-${fileName}.dto';
import { Update${fileNameCapitalized}Dto } from './dto/update-${fileName}.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('${fileName}')
@Controller('${fileName}')
export class ${fileNameCapitalized}Controller {
  constructor(private readonly ${fileName}Service: ${fileNameCapitalized}Service) {}

  @Post()
  create(@Body() create${fileNameCapitalized}Dto: Create${fileNameCapitalized}Dto) {
    return this.${fileName}Service.create(create${fileNameCapitalized}Dto);
  }

  @Get()
  findAll() {
    return this.${fileName}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${fileName}Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${fileNameCapitalized}Dto: Update${fileNameCapitalized}Dto) {
    return this.${fileName}Service.update(+id, update${fileNameCapitalized}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${fileName}Service.remove(+id);
  }
}
`;

      const controllerPath = `src/${name}/${name}.controller.ts`;
      fs.writeFile(controllerPath, controllerContent, (err) => {
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
