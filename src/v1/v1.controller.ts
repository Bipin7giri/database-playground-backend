import { Controller, Get, Param } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';

@Controller('v1')
export class V1Controller {
  @Get(':folderName')
  findAll(@Param('folderName') folderName: string): string {
    exec(`nest g resource ${folderName}`, (error, stdout) => {
      console.log(stdout);
      console.log(error);
      const fileContent = `import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('${folderName}')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment: string;
}`;
      const filePath = `src/${folderName}/entities/${folderName}.entity.ts`;
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error(`Error writing TypeScript file: ${err}`);
          return;
        }

        console.log(`Folder "${folderName}" created successfully.`);
      });
    });
    // exec(createFolderCommand, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error creating folder: ${stderr}`);
    //     return 'error';
    //   }

    //   console.log(`Folder "${folderName}" created successfully.`);

    //   // Step 2: Write a TypeScript file inside the folder
    //   const filePath = `${folderName}/${fileName}`;
    //   fs.writeFile(filePath, fileContent, (err) => {
    //     if (err) {
    //       console.error(`Error writing TypeScript file: ${err}`);
    //       return;
    //     }

    //     console.log(`TypeScript file "${fileName}" created successfully at "${folderName}".`);
    //   });
    // });
    return 'successful';
  }
}
