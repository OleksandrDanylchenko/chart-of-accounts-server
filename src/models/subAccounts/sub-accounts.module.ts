import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubAccountsRepository } from './sub-accounts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubAccountsRepository])],
  controllers: [],
  providers: [],
  exports: []
})
export class SubAccountsModule {}
