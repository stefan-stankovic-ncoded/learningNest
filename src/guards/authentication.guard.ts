import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside the authentication guard');

    try {
      const isPublic = this.reflector.get<boolean>(
        IS_PUBLIC_KEY,
        context.getHandler,
      );

      if (isPublic) return true;

      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException();
      }
      request.user = this.jwtService.verify(token);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
