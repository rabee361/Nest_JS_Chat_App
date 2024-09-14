import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  providers: [WebsocketsGateway,DatabaseService]
})
export class WebsocketsModule {}
