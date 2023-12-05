import { Controller, Get, Param } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';

@Controller('v1')
export class V1Controller {
  @Get(':folderName/:fileName')
  findAll(@Param('folderName') folderName: string, @Param('fileName') fileName: string): string {
    const createFolderCommand = `mkdir ${folderName}`;
    const fileContent = `
    const a = 5
    const b = a+8`;
    exec('nest g resource products', (error, stdout) => {
      console.log(stdout);
      console.log(error);
    });
    exec(createFolderCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating folder: ${stderr}`);
        return 'error';
      }

      console.log(`Folder "${folderName}" created successfully.`);

      // Step 2: Write a TypeScript file inside the folder
      const filePath = `${folderName}/${fileName}`;
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error(`Error writing TypeScript file: ${err}`);
          return;
        }

        console.log(`TypeScript file "${fileName}" created successfully at "${folderName}".`);
      });
    });
    return 'successful';
  }
}
