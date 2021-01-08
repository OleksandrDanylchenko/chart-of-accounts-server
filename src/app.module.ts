import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { AccountsModule } from './models/accounts/accounts.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresConfigModule,
    PostgresDatabaseProviderModule,
    AccountsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
