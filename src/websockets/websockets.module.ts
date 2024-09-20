import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { MulterModule } from '@nestjs/platform-express';
import { WebsocketsController } from './websockets.controller';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: './files/images/chats',
    }),
  ],
  providers: [WebsocketsGateway,DatabaseService],
  controllers: [WebsocketsController]
})
export class WebsocketsModule {}
