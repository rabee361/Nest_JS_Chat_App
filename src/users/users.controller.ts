import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('list')
    getUsers(){
        return this.usersService.getUsers();
    }


    @Get(':id')
    getUser() {
        return this.usersService.getUser();
    }
}
