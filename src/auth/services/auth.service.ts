import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';


@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_CLIENT') private readonly UserMicroservice: ClientProxy
  ) {}

  signUp(userModelDto,ip:string){
    try{
      const obj = {
        userModelDto,
        clientIp:ip
      }
      return this.UserMicroservice.send({cmd:'sign-up'},obj);
    }catch(e){
      new Logger().log("Could not sign you up");
      throw new HttpException(e,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async signIn(userModel,ip:string,req){
    try{
      const obj = {
        userModel,
        clientIp:ip
      }
      const response = await this.UserMicroservice.send({cmd:'sign-in'},obj).pipe(
        timeout(5000))
      .toPromise();
      req.res.setHeader('Set-Cookie',response.cookie);
      return {
        status: true,
        message: "Successfully logged in",
      }
    }catch(e){
      new Logger().log("Could not sign you in");
      throw new HttpException(e,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateEmail(email:string){
    try{
      return await this.UserMicroservice.send({cmd:'verify-email'},email);
    }catch(e){
      new Logger().log("Could not send email verification");
      throw new HttpException(e,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

