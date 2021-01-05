import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app/config.module';
import { PostgresConfigModule } from '../config/database/postgres/config.module';

@Module({
  imports: [AppConfigModule, PostgresConfigModule],
  controllers: [],
  providers: []
})
export class AppModule {}
