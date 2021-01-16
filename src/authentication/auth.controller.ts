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
import {
  JwtTokensService,
  RefreshTokenRequest,
  TokensPair
} from './jwt/jwt-tokens.service';
import { LoginUserDto } from '../models/users/dtos/login-user.dto';
import { RegistrationUserDto } from '../models/users/dtos/registration-user.dto';

@Public()
@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private tokenService: JwtTokensService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ description: "Login user's data", type: LoginUserDto })
  @ApiOkResponse({
    description: 'JWT access token and refresh token for provided credentials',
    type: TokensPair
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
  @ApiBody({
    description: "Registration user's data",
    type: RegistrationUserDto
  })
  @ApiOkResponse({
    description: 'JWT access token and refresh token for provided credentials',
    type: TokensPair
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
  @ApiBody({
    description: "User's refresh token",
    type: RefreshTokenRequest
  })
  @ApiOkResponse({
    description: 'JWT access token and refresh token for provided credentials',
    type: TokensPair
  })
  @ApiUnauthorizedResponse({
    description: 'Cannot allow JWT issuing',
    type: ApiResponseError
  })
  @Post('/update-token')
  async updateToken(@Body() payload: RefreshTokenRequest): Promise<TokensPair> {
    return this.tokenService.updateTokens(payload.refreshToken);
  }
}
