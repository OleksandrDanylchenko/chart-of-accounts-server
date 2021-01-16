import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../../models/users/entities/user.entity';
import { RefreshTokensService } from '../../models/refreshTokens/refresh-tokens.service';
import { UsersRepository } from '../../models/users/users.repository';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import RefreshToken from '../../models/refreshTokens/entities/refresh-token.entity';
import { RefreshTokensRepository } from '../../models/refreshTokens/refresh-tokens.repository';

export interface TokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class JwtTokensService {
  private static readonly DEFAULT_REFRESH_TOKEN_TTL = 38556952000;

  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const opts: SignOptions = {
      subject: String(user.id)
    };

    return this.jwtService.signAsync({}, opts);
  }

  async generateRefreshToken(
    user: User,
    expiresIn = JwtTokensService.DEFAULT_REFRESH_TOKEN_TTL
  ): Promise<string> {
    const token = await this.refreshTokensService.create(user, expiresIn);

    const opts: SignOptions = {
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id)
    };

    return this.jwtService.signAsync({}, opts);
  }

  async generateTokens(user: User): Promise<TokensPair> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async updateTokens(refreshToken: string): Promise<TokensPair> {
    const tokenPayload = (await this.decodeRefreshToken(
      refreshToken
    )) as RefreshTokenPayload;

    await this.getStoredTokenFromRefreshTokenPayload(tokenPayload);
    const user = await this.getUserFromRefreshTokenPayload(tokenPayload);

    return this.generateTokens(user);
  }

  private async decodeRefreshToken(
    token: string
  ): Promise<RefreshTokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;
    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    const token = await this.refreshTokensRepository.getById(tokenId);
    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }
    return token;
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload
  ): Promise<User> {
    const subId = payload.sub;
    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    const user = await this.usersRepository.getById(subId);
    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    return user;
  }
}
