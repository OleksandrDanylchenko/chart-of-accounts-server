import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializers';
import { hashValue } from '../../common/utils/hashing.helper';
import { LoginUserDto } from './dtos/login-user.dto';
import { validateOrReject } from 'class-validator';
import { EditUserDto } from './dtos/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async create(inputs: LoginUserDto): Promise<UserEntity> {
    await this.validateInputs(inputs);
    inputs.password = await hashValue(inputs.password);
    const newUser = await this.usersRepository.createEntity(inputs);
    return this.usersRepository.transform(newUser);
  }

  async update(userId: number, inputs: EditUserDto): Promise<UserEntity> {
    await this.validateInputs(inputs);
    const updateUser = await this.usersRepository.updateEntity(userId, inputs);
    return this.usersRepository.transform(updateUser);
  }

  async validateInputs(inputs: LoginUserDto | EditUserDto): Promise<void> {
    let userDto;
    if (inputs instanceof LoginUserDto) {
      userDto = new LoginUserDto();
      userDto.email = inputs.email;
      userDto.password = inputs.password;
    } else {
      userDto = new EditUserDto();
      userDto.email = inputs.email;
      userDto.password = inputs.password;
      userDto.refreshTokenId = inputs.refreshTokenId;
    }
    try {
      await validateOrReject(userDto);
    } catch (errors) {
      throw new BadRequestException(errors);
    }
  }
}
