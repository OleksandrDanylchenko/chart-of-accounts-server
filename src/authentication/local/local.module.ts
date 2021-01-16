import { Module } from '@nestjs/common';
import { UsersModule } from '../../models/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalService } from './local.service';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [LocalStrategy, LocalService],
  exports: [LocalService]
})
export class LocalModule {}
