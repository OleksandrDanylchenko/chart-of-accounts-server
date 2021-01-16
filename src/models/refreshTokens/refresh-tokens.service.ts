import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import RefreshToken from './entities/refresh-token.entity';
import User from '../users/entities/user.entity';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshTokensRepository)
    private readonly refreshTokensRepository: RefreshTokensRepository
  ) {}

  async create(user: User, ttl: number): Promise<RefreshToken> {
    await this.validateUserToken(user);
    await this.refreshTokensRepository.deleteUserTokens(user);

    const expires = new Date();
    expires.setTime(expires.getTime() + ttl);

    const newRefreshTokenInputs = RefreshToken.create({
      user,
      isRevoked: false,
      expires
    });
    return this.refreshTokensRepository.createEntity(newRefreshTokenInputs);
  }

  async validateUserToken(user: User): Promise<void> {
    const refreshToken = await this.refreshTokensRepository.getById(
      user.refreshTokenId
    );
    if (refreshToken && refreshToken.isRevoked) {
      throw new UnauthorizedException('Refresh token was revoked!');
    }
  }
}
