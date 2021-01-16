import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository, UsersRepositoryProvider } from './users.repository';
import { AuthConfigModule } from '../../config/authentication/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), AuthConfigModule],
  providers: [UsersService, UsersRepositoryProvider],
  exports: [UsersService, UsersRepositoryProvider]
})
export class UsersModule {}
