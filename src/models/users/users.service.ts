import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializers';
import LoginUserDto from './dtos/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false
  ): Promise<UserEntity | null> {
    return await this.usersRepository.getById(id, relations, throwsException);
  }

  async create(inputs: LoginUserDto): Promise<UserEntity> {
    return await this.usersRepository.createEntity(inputs);
  }

  async update(user: UserEntity, inputs: LoginUserDto): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(user, inputs);
  }
}
