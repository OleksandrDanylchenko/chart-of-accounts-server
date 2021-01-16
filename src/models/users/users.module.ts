import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository, UsersRepositoryProvider } from './users.repository';
import { RefreshTokensModule } from '../refreshTokens/refresh-tokens.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), RefreshTokensModule],
  providers: [UsersService, UsersRepositoryProvider],
  exports: [UsersService, UsersRepositoryProvider]
})
export class UsersModule {}
