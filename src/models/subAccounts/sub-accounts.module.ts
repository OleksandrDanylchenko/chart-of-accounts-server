import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubAccountsRepository } from './sub-accounts.repository';
import { SubAccountsController } from './sub-accounts.controller';
import { SubAccountsService } from './sub-accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubAccountsRepository])],
  controllers: [SubAccountsController],
  providers: [SubAccountsService],
  exports: [SubAccountsService]
})
export class SubAccountsModule {}
