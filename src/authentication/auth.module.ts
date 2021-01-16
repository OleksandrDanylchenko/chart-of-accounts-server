import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../models/users/users.module';
import { AuthController } from './auth.controller';
import { JwtTokensModule } from './jwt/jwt-tokens.module';
import { LocalModule } from './local/local.module';

@Module({
  imports: [UsersModule, PassportModule, JwtTokensModule, LocalModule],
  controllers: [AuthController],
  providers: []
})
export class AuthModule {}
