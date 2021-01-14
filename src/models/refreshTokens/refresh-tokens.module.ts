import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokensRepository } from './refresh-tokens.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokensRepository])],
  providers: [RefreshTokensService],
  exports: [RefreshTokensService]
})
export class RefreshTokensModule {}
