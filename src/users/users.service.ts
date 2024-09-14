import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {

    constructor(private database: DatabaseService) {}

    listUsers(){
        return this.database.user.findMany({
            where: {

            }
        })
    }

    getUser(id: number){
        return this.database.user.findUnique({
            where: {
                id,
            }
        })
    }


    async deleteUser(id: number) {
        const user = await this.database.user.delete({
            where:{
                id,
            }
        })
        return user;
    }


    chatMessages(id: number) {
        try {
            const chat = this.database.chat.findUnique({
                where: {
                    id,
                }
            })
        }
        catch {
            throw new HttpException('chat not found' , HttpStatus.NOT_FOUND)
        }
        const messages = this.database.message.findMany()
        if (messages) {
            return messages;
        }
        else {
            throw new HttpException('chat not found',HttpStatus.NOT_FOUND)
        }
    }
}
