import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { AccountsModule } from './models/accounts/accounts.module';
import { SyntheticAccountsModule } from './models/syntheticAccounts/synthetic-accounts.module';
import { SubAccountsModule } from './models/subAccounts/sub-accounts.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresConfigModule,
    PostgresDatabaseProviderModule,
    AccountsModule,
    SyntheticAccountsModule,
    SubAccountsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
