import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubAccountsRepository } from './sub-accounts.repository';
import { SubAccountEntity } from './serializers/sub-account.serializer';
import { CreateSubAccountDto } from './dtos/create-sub-account.dto';
import { EditSubAccountDto } from './dtos/edit-sub-account.dto';

@Injectable()
export class SubAccountsService {
  constructor(
    @InjectRepository(SubAccountsRepository)
    private readonly subAccountsRepository: SubAccountsRepository
  ) {}

  async getById(
    id: number,
    relations: string[] = [],
    throwsException = false
  ): Promise<SubAccountEntity | null> {
    const subAccount = await this.subAccountsRepository.getById(
      id,
      relations,
      throwsException
    );
    return this.subAccountsRepository.transform(subAccount);
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<SubAccountEntity[] | null> {
    const subAccounts = await this.subAccountsRepository.getAll(
      relations,
      throwsException
    );
    return this.subAccountsRepository.transformMany(subAccounts);
  }

  async create(inputs: CreateSubAccountDto): Promise<SubAccountEntity> {
    await this.validateAccountNumberNotExist(inputs.number);
    const newSubAccount = await this.subAccountsRepository.createEntity(inputs);
    return this.subAccountsRepository.transform(newSubAccount);
  }

  async update(
    accountId: number,
    inputs: EditSubAccountDto
  ): Promise<SubAccountEntity> {
    const account = await this.getById(accountId, [], true);
    if (inputs.number && inputs.number !== account.number) {
      await this.validateAccountNumberNotExist(inputs.number);
    }
    const updatedSubAccount = await this.subAccountsRepository.updateEntity(
      accountId,
      inputs
    );
    return this.subAccountsRepository.transform(updatedSubAccount);
  }

  async validateAccountNumberNotExist(number: number): Promise<void> {
    const accountWithNumber = await this.subAccountsRepository.getOneWhere({
      number
    });
    if (accountWithNumber) {
      throw new BadRequestException(
        `Sub account with provided number "${number}" already exists!`
      );
    }
  }

  async delete(entityId: number): Promise<SubAccountEntity> {
    const deletionEntity = await this.getById(entityId);
    if (deletionEntity) {
      await this.subAccountsRepository.deleteEntity(entityId);
    }
    return deletionEntity;
  }
}
