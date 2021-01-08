import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SyntheticAccountsRepository } from './synthetic-accounts.repository';
import { SyntheticAccountEntity } from './serializers/synthetic-account.serializer';
import { CreateAccountDto } from '../accounts/dtos/create-account.dto';
import { AccountEntity } from '../accounts/serializers/account.serializer';
import { EditAccountDto } from '../accounts/dtos/edit-account.dto';
import { EditSyntheticAccountDto } from './dtos/edit-synt-account.dto';
import { CreateSyntheticAccountDto } from './dtos/create-synt-account.dto';
import { SyntheticAccount } from './entities/synthetic-account.entity';

@Injectable()
export class SyntheticAccountsService {
  constructor(
    @InjectRepository(SyntheticAccountsRepository)
    private readonly syntheticAccountsRepository: SyntheticAccountsRepository
  ) {}

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false
  ): Promise<SyntheticAccountEntity | null> {
    return await this.syntheticAccountsRepository.getById(
      id,
      relations,
      throwsException
    );
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<SyntheticAccountEntity[] | null> {
    return await this.syntheticAccountsRepository.getAll(
      relations,
      throwsException
    );
  }

  async create(
    inputs: CreateSyntheticAccountDto
  ): Promise<SyntheticAccountEntity> {
    await this.validateAccountNumberNotExist(inputs.number);

    const {
      byDebitAccountsIds,
      byCreditAccountsIds,
      ...newSyntheticAccountData
    } = inputs;

    const byDebitAccounts = await this.resolveLinkedSyntheticAccounts(
      byDebitAccountsIds
    );
    const byCreditAccounts = await this.resolveLinkedSyntheticAccounts(
      byCreditAccountsIds
    );

    const newSyntheticAccount = {
      ...newSyntheticAccountData,
      byDebitAccounts,
      byCreditAccounts
    };

    return await this.syntheticAccountsRepository.createEntity(
      newSyntheticAccount,
      ['byDebitAccounts', 'byCreditAccounts']
    );
  }

  async update(
    account: SyntheticAccountEntity,
    inputs: EditSyntheticAccountDto
  ): Promise<SyntheticAccountEntity> {
    if (inputs.number && inputs.number !== account.number) {
      await this.validateAccountNumberNotExist(inputs.number);
    }

    return await this.syntheticAccountsRepository.updateEntity(
      account,
      inputs,
      ['byDebitAccounts', 'byCreditAccounts']
    );
  }

  async validateAccountNumberNotExist(number: number): Promise<void> {
    const accountWithNumber = await this.syntheticAccountsRepository.getByNumber(
      number
    );
    if (accountWithNumber) {
      throw new BadRequestException(
        `Synthetic account with provided number "${number}" already exists!`
      );
    }
  }

  async resolveLinkedSyntheticAccounts(
    syntheticAccountsIds: number[]
  ): Promise<SyntheticAccount[]> {
    const uniqueSyntheticAccountsIds = [...new Set(syntheticAccountsIds)];
    const resolvedSyntheticAccounts = [];

    await Promise.all(
      uniqueSyntheticAccountsIds.map(async (accountId) => {
        const resolvedAccount = await this.syntheticAccountsRepository.getDatabaseEntityById(
          accountId.toString(),
          [],
          true
        );
        resolvedSyntheticAccounts.push(resolvedAccount);
      })
    );

    return resolvedSyntheticAccounts;
  }
}