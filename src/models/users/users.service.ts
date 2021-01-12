import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializers';
import LoginUserDto from './dtos/login-user.dto';
import { hashValue } from '../../common/utils/hashing.helper';

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

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.getByEmail(email);
  }

  async create(inputs: LoginUserDto): Promise<UserEntity> {
    inputs.password = await hashValue(inputs.password);
    return await this.usersRepository.createEntity(inputs);
  }

  async update(user: UserEntity, inputs: LoginUserDto): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(user, inputs);
  }
}
