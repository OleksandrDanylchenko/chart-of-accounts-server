import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ApiResponseError } from '../common/errors/api-error.schema';
import { UserEntity } from '../models/users/serializers/user.serializers';
import { Public } from '../common/decorators/routes-privacy.decorator';

@Public()
@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'JWT access token for provided user data'
  })
  @ApiUnauthorizedResponse({
    description: 'Cannot allow JWT issuing',
    type: ApiResponseError
  })
  @Post('/login')
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    const userEntity = req.user as UserEntity;
    return this.authService.login(userEntity);
  }
}
