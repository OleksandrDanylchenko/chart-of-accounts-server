import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../../models/users/entities/user.entity';
import { IJwtPayload } from './strategies/jwt.strategy';
import { RefreshTokensService } from '../../models/refreshTokens/refresh-tokens.service';
import { UsersRepository } from '../../models/users/users.repository';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly usersRepository: UsersRepository
  ) {}

  async signToken(user: User): Promise<{ accessToken: string }> {
    const payload: IJwtPayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

  async login(user: User): Promise<{ accessToken: string }> {
    await this.refreshTokensService.update(user);
    return this.signToken(user);
  }

  async register(user: User): Promise<{ accessToken: string }> {
    return this.signToken(user);
  }

  async updateToken(userId: number): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.getById(
      userId,
      ['refreshToken'],
      true
    );
    await this.refreshTokensService.update(user);
    return this.signToken(user);
  }
}
