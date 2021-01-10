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
    return this.authService.login(req.user);
  }
}
