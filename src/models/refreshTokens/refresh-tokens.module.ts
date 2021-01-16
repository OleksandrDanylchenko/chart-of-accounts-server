import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RefreshTokensRepository,
  RefreshTokensRepositoryProvider
} from './refresh-tokens.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokensRepository])],
  providers: [RefreshTokensService, RefreshTokensRepositoryProvider],
  exports: [RefreshTokensService, RefreshTokensRepositoryProvider]
})
export class RefreshTokensModule {}
