import { Injectable } from '@nestjs/common';
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


    createUser() {
        
    }
}
