import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService) {}
    
    @Post('create')
    createChat() {
        return this.usersService.createChat()
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    listUsers(){
        return this.usersService.listUsers();
    }

    @Get('messages/:id')
    chatMessages(@Param('id' , ParseIntPipe) id: number) {        
        return this.usersService.chatMessages(id)
    }

    @Get(':id')
    getUser(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id' , ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }

    
    @Get('chats/:userId')
    listChats(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.listChats(userId)
    }
    

}
