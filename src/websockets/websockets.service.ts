import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UploadService } from 'utils/compress';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class WebsocketsService {
    constructor (private databaseService: DatabaseService , private uploadService: UploadService) {}

    async uploadImage(image:any){
        const attach = 'http://85.31.237.33/files/' + image?.originalname;
        const imageSize: string = String((image?.size / 1000000).toFixed(1)) + " MB"
        const myFile = await this.uploadService.compressImage(image)
        const attach2 = 'http://85.31.237.33/files/compressed/' + myFile.fileName;

        const file1 = await this.databaseService.attachment.create({
            data: {
             attach: attach,
             attachSize: imageSize   
            }
        })

        const file2 = await this.databaseService.attachment.create({
            data: {
             attach: attach2,
             attachSize: myFile.fileSize   
            }
        })

        return {file1 , file2}; 

    }
    

    async createChat(createChatDto: CreateChatDto) {
        const chat = await this.databaseService.chat.create({
            data: {
                user1Id: 1,
                user2Id: 5,
            }
        })
        return chat
    }


    async listChats(id) {
        const chats = await this.databaseService.chat.findMany({
            where: {
                OR: [
                    {user1Id: id},
                    {user2Id: id}
                ]
            },
            include: {
                user1: true,
                user2: true
            }
        })
        return chats
    }
}
