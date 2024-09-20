import { Controller, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DatabaseService } from 'src/database/database.service';

@Controller('chats')
export class WebsocketsController {
    constructor (private databaseService: DatabaseService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './files/images/chats',
          filename: function (req, file, cb) {
            cb(null, file.originalname)
          }
        }),
      }))
    uploadImage(@UploadedFile() image) {
        const attach = 'http://localhost:3000/files/images/chats/' + image?.originalname;
        const message = this.databaseService.attachment.create({
            data: {
                attach: attach
            }
        })

        return message;
    }
}
