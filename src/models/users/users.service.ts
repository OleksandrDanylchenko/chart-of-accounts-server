import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { hashValue } from '../../common/utils/hashing.helper';
import { LoginUserDto } from './dtos/login-user.dto';
import { validateOrReject } from 'class-validator';
import { EditUserDto } from './dtos/edit-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async create(inputs: LoginUserDto): Promise<User> {
    await this.validateInputs(inputs);
    inputs.password = await hashValue(inputs.password);
    return this.usersRepository.createEntity(inputs);
  }

  async update(userId: number, inputs: EditUserDto): Promise<User> {
    await this.validateInputs(inputs);
    return this.usersRepository.updateEntity(userId, inputs);
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
