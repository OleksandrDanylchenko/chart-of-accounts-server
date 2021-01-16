import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../../models/users/entities/user.entity';
import { IJwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class JwtTokensService {
  constructor(private jwtService: JwtService) {}

  async signToken(user: User): Promise<{ accessToken: string }> {
    const payload: IJwtPayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
