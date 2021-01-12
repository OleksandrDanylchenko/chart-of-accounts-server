import { Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './strategies/jwt.strategy';
import { compareValues } from '../common/utils/hashing.helper';
import { UserEntity } from '../models/users/serializers/user.serializers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.usersService.getByEmail(email);
    const isPasswordMatching = user
      ? await compareValues(user.password, password)
      : true;
    user = user ?? (await this.usersService.create({ email, password }));

    if (isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const payload: IJwtPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
