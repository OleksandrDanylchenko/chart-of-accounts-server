import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';

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
    return await this.usersRepository.get(id, relations, throwsException);
  }

  async create(inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.createEntity(inputs);
  }

  async update(user: UserEntity, inputs: EditUserDto): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(user, inputs);
  }
}
