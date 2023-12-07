import Capitalized from 'src/utils/capitalized';
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
      const entity = Capitalized(name);
      const controllerService: string = `import { Injectable } from '@nestjs/common';
      import { CreateProductDto } from './dto/create-${fileName}.dto';
      import { UpdateProductDto } from './dto/update-${fileName}.dto';
      @Injectable()
      export class ${entity}Service {
        constructor(
          @InjectRepository(Category)
          private readonly ${fileName}Repository: Repository<${entity}>,
        ) {}
      
        findAll() {
          return this.${fileName}Repository.find();
        }
      
        findOne(id: number) {
          return this.${fileName}Repository.findOne(id);
        }
      
        update(id: number, update${entity}Dto: Update${entity}Dto) {
          return this.${fileName}Repository.update(id, update${entity}Dto);
        }
      
        remove(id: number) {
          return this.${fileName}Repository.update(id, {
            deleted: true,
          });
        }
      }`;

      const entityPath = `src/${name}/controller/${name}.entity.ts`;
      fs.writeFile(entityPath, controllerService, (err) => {
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
