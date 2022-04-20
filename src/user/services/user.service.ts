import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';


@Injectable()
export class UserService {
  constructor(
    @Inject('auth-microservice') private readonly AuthMicroservice: ClientProxy
  ) {}

  signUp(userModelDto,ip:string){
    const obj = {
      userModelDto,
      clientIp:ip
    }
    return this.AuthMicroservice.send({cmd:'sign-up'},obj);
  }


  async signIn(userModel,ip:string,req){
    const obj = {
      userModel,
      clientIp:ip
    }
    const response = await this.AuthMicroservice.send({cmd:'sign-in'},obj).pipe(
      timeout(5000))
    .toPromise();
    console.log("This is the accessToken");
    req.res.setHeader('Set-Cookie',response);
    return this.AuthMicroservice.send({cmd:'sign-in'},obj);
  }
}

