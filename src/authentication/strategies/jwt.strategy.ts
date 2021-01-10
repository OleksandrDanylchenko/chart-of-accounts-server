import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConfigService } from '../../config/authentication/config.service';

export interface IJwtPayload {
  sub: string;
  username: string;
}

export interface IJwtContent {
  userId: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfigService.jwtSecret
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtContent> {
    return { userId: payload.sub, username: payload.username };
  }
}
