import { AuthConfigService } from '../../config/authentication/config.service';
import { AuthConfigModule } from '../../config/authentication/config.module';
import { UsersModule } from '../../models/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtTokensService } from './jwt-tokens.service';
import { RefreshTokensModule } from '../../models/refreshTokens/refresh-tokens.module';

@Module({
  imports: [
    UsersModule,
    AuthConfigModule,
    RefreshTokensModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.jwtSecret,
        signOptions: { expiresIn: '10s' }
      }),
      inject: [AuthConfigService]
    })
  ],
  controllers: [],
  providers: [JwtStrategy, JwtTokensService],
  exports: [JwtTokensService]
})
export class JwtTokensModule {}
