import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../../models/users/entities/user.entity';
import { IJwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class JwtTokensService {
  constructor(private jwtService: JwtService) {}

  async login(user: User): Promise<{ access_token: string }> {
    const payload: IJwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
