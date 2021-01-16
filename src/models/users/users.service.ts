import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { hashValue } from '../../common/utils/hashing.helper';
import { validateOrReject } from 'class-validator';
import { EditUserDto } from './dtos/edit-user.dto';
import User from './entities/user.entity';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { AuthConfigService } from '../../config/authentication/config.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly authConfigService: AuthConfigService
  ) {}

  async create(inputs: RegistrationUserDto): Promise<User> {
    const registrationDto = new RegistrationUserDto();
    registrationDto.email = inputs.email;
    registrationDto.password = inputs.password;
    registrationDto.registrationSecret = inputs.registrationSecret;

    await this.validateInputs(registrationDto);
    await this.validateRegistrationSecret(registrationDto.registrationSecret);
    inputs.password = await hashValue(inputs.password);
    return this.usersRepository.createEntity(inputs);
  }

  async update(userId: number, inputs: EditUserDto): Promise<User> {
    const editDto = new EditUserDto();
    editDto.email = inputs.email;
    editDto.password = inputs.password;
    editDto.refreshTokenId = inputs.refreshTokenId;

    await this.validateInputs(editDto);
    return this.usersRepository.updateEntity(userId, inputs);
  }

  async validateRegistrationSecret(registrationSecret?: string): Promise<void> {
    if (this.authConfigService.registrationSecret !== registrationSecret) {
      throw new BadRequestException(
        'Registration secret is not the same as in the system!'
      );
    }
  }

  async validateInputs(
    inputs: RegistrationUserDto | EditUserDto
  ): Promise<void> {
    try {
      await validateOrReject(inputs);
    } catch (errors) {
      throw new BadRequestException(errors);
    }
  }
}
