import { BadRequestException, Injectable } from '@nestjs/common';
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
    return await this.accountsRepository.getById(
      id,
      relations,
      throwsException
    );
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<AccountEntity[] | null> {
    return await this.accountsRepository.getAll(relations, throwsException);
  }

  async create(inputs: CreateAccountDto): Promise<AccountEntity> {
    const accountWithNumber = await this.accountsRepository.getByNumber(
      inputs.number
    );
    if (accountWithNumber) {
      throw new BadRequestException(
        `Account with provided number "${inputs.number}" already exists!`
      );
    }
    return await this.accountsRepository.createEntity(inputs);
  }

  async update(
    account: AccountEntity,
    inputs: EditAccountDto
  ): Promise<AccountEntity> {
    return await this.accountsRepository.updateEntity(account, inputs);
  }
}
