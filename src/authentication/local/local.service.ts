import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../models/users/users.repository';
import { compareValues } from '../../common/utils/hashing.helper';
import User from '../../models/users/entities/user.entity';
import { UsersService } from '../../models/users/users.service';

@Injectable()
export class LocalService {
  constructor(
    private usersRepository: UsersRepository,
    private usersService: UsersService
  ) {}

  async validateExistingUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.getOneWhere({ email });
    if (!user) return null;

    const isPasswordMatching = await compareValues(password, user.password);
    if (isPasswordMatching) {
      return user;
    }
    return null;
  }

  async registerUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.getOneWhere({ email });
    return user ?? (await this.usersService.create({ email, password }));
  }
}
