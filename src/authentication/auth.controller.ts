import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ApiResponseError } from '../common/errors/api-error.schema';
import { Public } from '../common/decorators/routes-privacy.decorator';
import { LocalAuthGuard } from './local/guards/local-auth.guard';
import User from '../models/users/entities/user.entity';
import { JwtTokensService, TokensPair } from './jwt/jwt-tokens.service';
import { LoginUserDto } from '../models/users/dtos/login-user.dto';

@Public()
@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private tokenService: JwtTokensService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ description: "Login user's data", type: LoginUserDto })
  @ApiOkResponse({
    description: 'JWT access token for provided user data'
  })
  @ApiUnauthorizedResponse({
    description: 'Cannot find user with provided credentials',
    type: ApiResponseError
  })
  @Post('/login')
  async login(@Req() req: Request): Promise<TokensPair> {
    const user = req.user as User;
    return this.tokenService.generateTokens(user);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ description: "Registration user's data", type: LoginUserDto })
  @ApiOkResponse({
    description: 'JWT access token for provided user data'
  })
  @ApiUnauthorizedResponse({
    description: 'Cannot allow JWT issuing',
    type: ApiResponseError
  })
  @Post('/registration')
  async register(@Req() req: Request): Promise<TokensPair> {
    const user = req.user as User;
    return this.tokenService.generateTokens(user);
  }

  @Public()
  @ApiOkResponse({
    description: 'JWT access token for provided user data'
  })
  @ApiUnauthorizedResponse({
    description: 'Cannot allow JWT issuing',
    type: ApiResponseError
  })
  @Post('/update-token')
  async updateToken(
    @Body() payload: { refreshToken: string }
  ): Promise<TokensPair> {
    return this.tokenService.updateTokens(payload.refreshToken);
  }
}
