import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializers';
import { hashValue } from '../../common/utils/hashing.helper';
import { LoginUserDto } from './dtos/login-user.dto';
import { validateOrReject } from 'class-validator';

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
    await this.validateInputs(inputs);
    inputs.password = await hashValue(inputs.password);
    return await this.usersRepository.createEntity(inputs);
  }

  async update(user: UserEntity, inputs: LoginUserDto): Promise<UserEntity> {
    await this.validateInputs(inputs);
    return await this.usersRepository.updateEntity(user, inputs);
  }

  async validateInputs(inputs: LoginUserDto): Promise<void> {
    const userDto = new LoginUserDto();
    userDto.email = inputs.email;
    userDto.password = inputs.password;
    try {
      await validateOrReject(userDto);
    } catch (errors) {
      throw new BadRequestException(errors);
    }
  }
}
