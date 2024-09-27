import { Module } from '@nestjs/common';
import { WebsocketsModule } from './websockets/websockets.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    WebsocketsModule,
    UsersModule,
    DatabaseModule, 
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','files')
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
