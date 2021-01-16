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

  async getById(
    id: number,
    relations: string[] = [],
    throwsException = false
  ): Promise<AccountEntity | null> {
    const account = await this.accountsRepository.getById(
      id,
      relations,
      throwsException
    );
    return this.accountsRepository.transform(account);
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<AccountEntity[] | null> {
    const accounts = await this.accountsRepository.getAll(
      relations,
      throwsException
    );
    return this.accountsRepository.transformMany(accounts);
  }

  async create(inputs: CreateAccountDto): Promise<AccountEntity> {
    await this.validateAccountNumberNotExist(inputs.number);
    const newAccount = await this.accountsRepository.createEntity(inputs);
    return this.accountsRepository.transform(newAccount);
  }

  async update(
    accountId: number,
    inputs: EditAccountDto
  ): Promise<AccountEntity> {
    const account = await this.getById(accountId, [], true);
    if (inputs.number && inputs.number !== account.number) {
      await this.validateAccountNumberNotExist(inputs.number);
    }

    const updatedAccount = await this.accountsRepository.updateEntity(
      accountId,
      inputs
    );
    return this.accountsRepository.transform(updatedAccount);
  }

  async validateAccountNumberNotExist(number: number): Promise<void> {
    const accountWithNumber = await this.accountsRepository.getOneWhere({
      number
    });
    if (accountWithNumber) {
      throw new BadRequestException(
        `Account with provided number "${number}" already exists!`
      );
    }
  }

  async delete(entityId: number): Promise<AccountEntity> {
    const deletionEntity = await this.getById(entityId);
    if (deletionEntity) {
      await this.accountsRepository.deleteEntity(entityId);
    }
    return deletionEntity;
  }
}
