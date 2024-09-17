import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-mesage.dto';
import { DatabaseService } from 'src/database/database.service';

@WebSocketGateway({ 
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: true
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
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket  ) {
    const message = await this.databaseService.message.create({
      data:{
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        chatId: createMessageDto.chatId
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