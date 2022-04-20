import { Controller, Post, Body, HttpCode, Req } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { Request } from 'express';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('/api/v1/signup')
  signUp(@Body() userModelDto,@RealIP() ip: string):any {
    return this.userService.signUp(userModelDto,ip);
  }

  @HttpCode(200)
  @Post('/api/v1/signin')
  signIn(@Body() userObject,@RealIP() ip: string, @Req() req:Request):any {
    return this.userService.signIn(userObject,ip,req);
  }
}
