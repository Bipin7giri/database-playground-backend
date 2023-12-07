import Capitalized from 'src/utils/capitalized';

const createEntity = (folderName: string): string => {
  const CapitalizeFolderName = Capitalized(folderName);

  return `import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

    @Entity('${folderName}')
    export class ${CapitalizeFolderName}Entity {
      @PrimaryGeneratedColumn()
      id: number;

      @Column({ nullable: true })
      comment: string;
    }`;
};

export default createEntity;
