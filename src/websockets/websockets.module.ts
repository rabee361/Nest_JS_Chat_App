import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
// import { MulterModule } from '@nestjs/platform-express';
import { WebsocketsController } from './websockets.controller';
import { UploadService } from 'utils/compress';
import { WebsocketsService } from './websockets.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [WebsocketsGateway,DatabaseService,UploadService, WebsocketsService],
  controllers: [WebsocketsController]
})
export class WebsocketsModule {}
