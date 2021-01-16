import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { RefreshTokenEntity } from './serializers/refresh-token.serializer';
import RefreshToken from './entities/refresh-token.entity';
import User from '../users/entities/user.entity';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshTokensRepository)
    private readonly refreshTokensRepository: RefreshTokensRepository
  ) {}
  async create(user: User, ttl: number): Promise<RefreshTokenEntity> {
    const expires = new Date();
    expires.setTime(expires.getTime() + ttl);

    const newRefreshTokenInputs = RefreshToken.create({
      user,
      isRevoked: false,
      expires
    });
    const newRefreshToken = await this.refreshTokensRepository.createEntity(
      newRefreshTokenInputs
    );
    return this.refreshTokensRepository.transform(newRefreshToken);
  }
}
