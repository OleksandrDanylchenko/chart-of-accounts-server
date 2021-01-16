import { Module } from '@nestjs/common';
import { UsersModule } from '../../models/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalService } from './local.service';
import { AuthConfigModule } from '../../config/authentication/config.module';

@Module({
  imports: [UsersModule, AuthConfigModule],
  controllers: [],
  providers: [LocalStrategy, LocalService],
  exports: [LocalService]
})
export class LocalModule {}
