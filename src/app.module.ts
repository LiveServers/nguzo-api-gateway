import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
