import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use('/files', express.static(join(process.cwd(), 'files')));
  await app.listen(3000);
}
bootstrap();
