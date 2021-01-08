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
    await this.validateAccountNumberNotExist(inputs.number);
    return await this.accountsRepository.createEntity(inputs);
  }

  async update(
    account: AccountEntity,
    inputs: EditAccountDto
  ): Promise<AccountEntity> {
    if (inputs.number && inputs.number !== account.number) {
      await this.validateAccountNumberNotExist(inputs.number);
    }
    return await this.accountsRepository.updateEntity(account, inputs);
  }

  async validateAccountNumberNotExist(number: number): Promise<void> {
    const accountWithNumber = await this.accountsRepository.getByNumber(number);
    if (accountWithNumber) {
      throw new BadRequestException(
        `Account with provided number "${number}" already exists!`
      );
    }
  }

  async delete(entityId: string): Promise<AccountEntity> {
    const deletionEntity = await this.get(entityId);
    if (deletionEntity) {
      await this.accountsRepository.deleteEntity(deletionEntity);
    }
    return deletionEntity;
  }
}
