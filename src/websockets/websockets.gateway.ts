import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-mesage.dto';
import { DatabaseService } from 'src/database/database.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@WebSocketGateway({ 
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: true,
    allowedHeaders: ['content-type', 'authorization']
  }
})
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private databaseService: DatabaseService) {}

  private clients: Set<Socket> = new Set();

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }


  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }




  @SubscribeMessage('messageToServer')
  // @UseInterceptors(FileInterceptor('attach', {
  //   storage: diskStorage({
  //     destination: './files',
  //     filename: function (req, file, cb) {
  //       cb(null, file.originalname)
  //     }
  //   }),
  // }))
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto ,@ConnectedSocket() client: Socket) {
    console.log(createMessageDto);
    
    // if (createMessageDto.attach) {
    //   createMessageDto.attach = 'http://localhost:3000/files/' + attach?.originalname; // Update this to use the new filename
    //   console.log(createMessageDto.attach);
      
    //   await this.databaseService.message.create({
    //     data:{
    //       content: createMessageDto.content,
    //       senderId: createMessageDto.senderId,
    //       chatId: createMessageDto.chatId,
    //     },
    //   })
    // }

    const message = await this.databaseService.message.create({
      data:{
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        chatId: createMessageDto.chatId,
        attach: createMessageDto.attachId
      },
    })
    
    this.server.emit('messageToClient',message);
    
  }


  @SubscribeMessage('getMessagesServer')
  async getMessages(@MessageBody() chatId: number ,  @ConnectedSocket() client: Socket) {
    const messages = await this.databaseService.message.findMany({
      where: {
        chatId,
      }
    })
    return messages
  }


}