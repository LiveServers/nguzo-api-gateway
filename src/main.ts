import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: process.env.USER_PORT,
  //   },
  // });
  // await app.startAllMicroservices();
  console.log(`Auth service running on http:localhost:${process.env.SERVER_PORT}`);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
