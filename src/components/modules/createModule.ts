import Capitalized from 'src/utils/capitalized';

const createModule = (folderName: string): string => {
  const CapitalizeFolderName = Capitalized(folderName);

  return `import { Module } from '@nestjs/common';
          import { TypeOrmModule } from '@nestjs/typeorm';
          import { ${CapitalizeFolderName}Service } from './${folderName}.service';
          import { ${CapitalizeFolderName}Controller } from './${folderName}.controller';
          import { ${CapitalizeFolderName}Entity } from './entities/${folderName}.entity';

          @Module({
            imports: [
              TypeOrmModule.forFeature([
                ${CapitalizeFolderName}Entity ,
              ]),
            ],
            controllers: [${CapitalizeFolderName}Controller],
            providers: [${CapitalizeFolderName}Service],
          })
          export class ${CapitalizeFolderName}Module {}`;
};

export default createModule;
