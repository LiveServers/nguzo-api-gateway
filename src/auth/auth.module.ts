import { Module } from '@nestjs/common';
import * as dotenv from "dotenv";
import {JwtModule} from "@nestjs/jwt"
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

dotenv.config();

@Module({
    imports: [ClientsModule.register([
        {
          name:'AUTH_CLIENT',
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: parseInt(process.env.USER_PORT,10),
          },
        },
      ]),
      JwtModule.register({
        secret: process.env.SECRET,
        signOptions: {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME}
      })],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
