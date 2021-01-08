import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SyntheticAccountsController } from './synthetic-accounts.controller';
import { SyntheticAccountsService } from './synthetic-accounts.service';
import { SyntheticAccountsRepository } from './synthetic-accounts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SyntheticAccountsRepository])],
  controllers: [SyntheticAccountsController],
  providers: [SyntheticAccountsService],
  exports: [SyntheticAccountsService]
})
export class SyntheticAccountsModule {}
