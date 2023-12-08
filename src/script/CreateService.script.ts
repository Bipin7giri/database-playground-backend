import Capitalized from 'src/utils/capitalized';
import * as fs from 'fs';
import { InternalServerErrorException } from '@nestjs/common';

export class CreateService {
  async create(name: string) {
    try {
      const fileName: string = name;
      const entity = Capitalized(name);
      const serviceContent: string = `import { Injectable } from '@nestjs/common';
      import { Create${entity}Dto } from './dto/create-${fileName}.dto';
      import { Update${entity}Dto } from './dto/update-${fileName}.dto';
      import { Repository } from 'typeorm';
      import { ${entity}Entity } from './entities/${fileName}.entity';
      import { InjectRepository } from '@nestjs/typeorm';
      @Injectable()
      export class ${entity}Service {
        constructor(
          @InjectRepository(${entity}Entity)
          private readonly ${fileName}Repository: Repository<${entity}Entity>,
        ) {}
      
        create(data: Create${entity}Dto) {
            return this.${fileName}Repository.save(data);
          }

        findAll() {
          return this.${fileName}Repository.find();
        }
      
        findOne(id: number) {
          return this.${fileName}Repository.findOne({
            where: {
              id: id,
            },
          });
        }
      
        update(id: number, update${entity}Dto: Update${entity}Dto) {
          return this.${fileName}Repository.update(id, update${entity}Dto);
        }
      
        remove(id: number) {
          return this.${fileName}Repository.delete(id);
        }
      }`;

      const servicePath = `src/${name}/${name}.service.ts`;
      fs.writeFile(servicePath, serviceContent, (err) => {
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
