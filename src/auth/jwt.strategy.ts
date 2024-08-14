import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfiguration, { SECRET_KEY } from './auth.configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfiguration()[SECRET_KEY],
    });
  }

  async validate(payload: any) {
    // This is the place we can go to the database, pull the user out,
    // do some more token validation steps
    return { userId: payload.sub, email: payload.email };
  }
}
