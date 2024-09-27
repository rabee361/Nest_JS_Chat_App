import { Controller, HttpException, HttpStatus, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Attachment } from '@prisma/client';
import { diskStorage } from 'multer';
import { bool } from 'sharp';
import { DatabaseService } from 'src/database/database.service';
import { UploadService } from 'utils/compress';

@Controller('chats')
export class WebsocketsController {
    constructor (private databaseService: DatabaseService , private uploadService: UploadService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: function (req, file, cb) {
                cb(null, file.originalname);
          }
        }),
      }))
    async uploadImage(@UploadedFile() image) {
        const attach = 'http://localhost:3000/files/' + image?.originalname;
        const imageSize: string = String((image?.size / 1000000).toFixed(1)) + " MB"
        const myFile = await this.uploadService.compressImage(image)
        const attach2 = 'http://localhost:3000/files/compressed/' + myFile.fileName;
        const message1 = await this.databaseService.attachment.create({
          data: {
            attach : attach , 
            attachSize: imageSize
          },
        })
        const message2 = await this.databaseService.attachment.create({
            data: {
              attach : attach2 , 
              attachSize: myFile.fileSize
            },
        })
        
        return {message1 , message2}; 

    }
}
