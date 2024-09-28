import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    listUsers(){
        return this.usersService.listUsers();
    }

    @Get(':id')
    getUser(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id' , ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }

}
