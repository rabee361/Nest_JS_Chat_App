import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { DatabaseService } from 'src/database/database.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3001'],
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

////////////// edit
  @SubscribeMessage('messageToServer')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto ,@ConnectedSocket() client: Socket) {
    console.log(createMessageDto);

    const message = await this.databaseService.message.create({
      data:{
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        chatId: createMessageDto.chatId,
        attach: createMessageDto.attach,
        attachSize: createMessageDto.attachSize,
        attach2: createMessageDto.attach2,
        attachSize2: createMessageDto.attachSize2
      },
    })
    console.log(message);
    
    
    this.server.emit('messageToClient',message);
    
  }

/////////////// edit
  @SubscribeMessage('getMessagesServer')
  async getMessages(@ConnectedSocket() client: Socket ,@MessageBody() chatId?: number) {
    const messages = await this.databaseService.message.findMany({
      where: {
        chatId
      },
    })
    return messages
  }

}