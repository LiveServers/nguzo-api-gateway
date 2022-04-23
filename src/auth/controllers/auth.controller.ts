import { Controller, Post, Body, HttpCode, Req, UseGuards, Get } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthGuard, LogOutGuard } from '../guards/auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/api/v1/signup')
  signUp(@Body() userModelDto,@RealIP() ip: string):any {
    return this.authService.signUp(userModelDto,ip);
  }

  @HttpCode(200)
  @Post('/api/v1/signin')
  signIn(@Body() userObject,@RealIP() ip: string, @Req() req:Request):any {
    return this.authService.signIn(userObject,ip,req);
  }

  @UseGuards(AuthGuard)
  @Get("/api/v1/test")
  test(){
    return "This has passed successfully";
  }

  @HttpCode(200)
  @UseGuards(LogOutGuard)
  @Post('/api/v1/logout')
  logOut():any {
    return {
      status: true,
      message: "Successfully logged out",
    }
  }

  @HttpCode(200)
  @Post('/api/v1/validate-email')
  validateEmail(@Body() body):any {
    return this.authService.validateEmail(body.email);
  }
}
