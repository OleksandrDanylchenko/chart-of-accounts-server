import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository, UsersRepositoryProvider } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersService, UsersRepositoryProvider],
  exports: [UsersService, UsersRepositoryProvider]
})
export class UsersModule {}
