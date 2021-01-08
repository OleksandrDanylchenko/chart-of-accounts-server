import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsRepository } from './accounts.repository';
import { AccountEntity } from './serializers/account.serializer';
import { CreateAccountDto } from './dtos/create-account.dto';
import { EditAccountDto } from './dtos/edit-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountsRepository)
    private readonly accountsRepository: AccountsRepository
  ) {}

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false
  ): Promise<AccountEntity | null> {
    return await this.accountsRepository.get(id, relations, throwsException);
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<AccountEntity[] | null> {
    return await this.accountsRepository.getAll(relations, throwsException);
  }

  async create(inputs: CreateAccountDto): Promise<AccountEntity> {
    return await this.accountsRepository.createEntity(inputs);
  }

  async update(
    account: AccountEntity,
    inputs: EditAccountDto
  ): Promise<AccountEntity> {
    return await this.accountsRepository.updateEntity(account, inputs);
  }
}
