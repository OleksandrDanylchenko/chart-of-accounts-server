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

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false
  ): Promise<SubAccountEntity | null> {
    return await this.subAccountsRepository.getById(
      id,
      relations,
      throwsException
    );
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<SubAccountEntity[] | null> {
    return await this.subAccountsRepository.getAll(relations, throwsException);
  }

  async create(inputs: CreateSubAccountDto): Promise<SubAccountEntity> {
    await this.validateAccountNumberNotExist(inputs.number);
    return await this.subAccountsRepository.createEntity(inputs);
  }

  async update(
    account: SubAccountEntity,
    inputs: EditSubAccountDto
  ): Promise<SubAccountEntity> {
    if (inputs.number && inputs.number !== account.number) {
      await this.validateAccountNumberNotExist(inputs.number);
    }
    return await this.subAccountsRepository.updateEntity(account, inputs);
  }

  async validateAccountNumberNotExist(number: number): Promise<void> {
    const accountWithNumber = await this.subAccountsRepository.getByNumber(
      number
    );
    if (accountWithNumber) {
      throw new BadRequestException(
        `Sub account with provided number "${number}" already exists!`
      );
    }
  }

  async delete(entityId: string): Promise<SubAccountEntity> {
    const deletionEntity = await this.get(entityId);
    if (deletionEntity) {
      await this.subAccountsRepository.deleteEntity(deletionEntity);
    }
    return deletionEntity;
  }
}
