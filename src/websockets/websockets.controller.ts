import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { bool } from 'sharp';
import { DatabaseService } from 'src/database/database.service';
import { UploadService } from 'utils/compress';
import { WebsocketsService } from './websockets.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class WebsocketsController {
    constructor (private databaseService: DatabaseService, private websocketService: WebsocketsService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: function (req, file, cb) {
                cb(null, file.originalname);
          }
        }),
      }))
     uploadImage(@UploadedFile() image) {
        return this.websocketService.uploadImage(image)
    }

    @Post('create')
    createChat(@Body() createChatDto: CreateChatDto) {
      try {
        return this.websocketService.createChat(createChatDto);
      }
      catch {
        throw new HttpException('something went wrong' , HttpStatus.BAD_REQUEST)
      }
    }


    @Get('list/:id')
    listChats(@Param('id' , ParseIntPipe) id: number) {
      return this.websocketService.listChats(id);

    }
}
