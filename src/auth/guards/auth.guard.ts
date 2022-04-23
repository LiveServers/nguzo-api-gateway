
import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT') private readonly user: ClientProxy, private jwtService : JwtService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try{
        const token  = req.headers["cookie"].split("Authentication=")[1].split(';')[0];
        const verified = await this.jwtService.verify(token,{
            secret:process.env.ACCESS_TOKEN_SECRET
        });
        const data = {
            id: verified.sub,
            token,
        }
        await this.user.send(
            { cmd: 'verify' },
            data)
            .pipe(timeout(5000))
            .toPromise();
        return true;
    } catch(err) {
      Logger.error(err);
      return false;
    }
  }
}

@Injectable()
export class LogOutGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT') private readonly user: ClientProxy, private jwtService : JwtService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try{
        const token  = req.headers["cookie"].split("Authentication=")[1].split(';')[0];
        const verified = await this.jwtService.verify(token,{
            secret:process.env.ACCESS_TOKEN_SECRET
        });
        await this.user.send(
            { cmd: 'logout' },
            verified.sub)
            .pipe(timeout(5000))
            .toPromise();
        req.res.setHeader('Set-Cookie',"Authentication=; HttpOnly; Path=/; max-age=0; Secure");
        return true;
    } catch(err) {
      Logger.error(err);
      return false;
    }
  }
}