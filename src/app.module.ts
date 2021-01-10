import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { AccountsModule } from './models/accounts/accounts.module';
import { SyntheticAccountsModule } from './models/syntheticAccounts/synthetic-accounts.module';
import { SubAccountsModule } from './models/subAccounts/sub-accounts.module';
import { AuthModule } from './authentication/auth.module';
import { AuthConfigModule } from './config/authentication/config.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';

@Module({
  imports: [
    AppConfigModule,
    PostgresConfigModule,
    AuthConfigModule,
    PostgresDatabaseProviderModule,
    AuthModule,
    AccountsModule,
    SyntheticAccountsModule,
    SubAccountsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
