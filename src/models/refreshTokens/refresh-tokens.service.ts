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

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false
  ): Promise<RefreshTokenEntity | null> {
    return await this.refreshTokensRepository.getById(
      id,
      relations,
      throwsException
    );
  }

  async create(user: User, ttl: number): Promise<RefreshTokenEntity> {
    const expires = new Date();
    expires.setTime(expires.getTime() + ttl);

    const newRefreshToken = RefreshToken.create({
      user,
      isRevoked: false,
      expires
    });
    return await this.refreshTokensRepository.createEntity(newRefreshToken);
  }
}
