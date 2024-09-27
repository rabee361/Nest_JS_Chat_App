import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    MulterModule.register({
      dest: './files',
    }),
    JwtModule.register({
      secret: 'abc123',
      signOptions: {'expiresIn':'1h'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy , DatabaseService]
})
export class AuthModule {}
