import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    listUsers(){
        return this.usersService.listUsers();
    }

    @Get(':id')
    getUser(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.getUser(id);
    }
}
