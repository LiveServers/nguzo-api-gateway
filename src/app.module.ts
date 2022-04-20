import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
