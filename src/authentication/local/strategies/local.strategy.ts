import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LocalService } from '../local.service';
import User from '../../../models/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private localService: LocalService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.localService.validateExistingUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
