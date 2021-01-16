import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LocalService } from '../local.service';
import User from '../../../models/users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private localService: LocalService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string): Promise<User> {
    let user;

    if (req.path.includes('/login')) {
      user = await this.localService.validateExistingUser(email, password);
    } else {
      user = await this.localService.registerUser(email, password);
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
