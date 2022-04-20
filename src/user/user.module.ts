import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
    imports: [ClientsModule.register([
        {
          name:'auth-microservice',
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 7777,
          },
        },
      ])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
