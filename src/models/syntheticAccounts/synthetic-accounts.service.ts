import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SyntheticAccountsRepository } from './synthetic-accounts.repository';
import { SyntheticAccountEntity } from './serializers/synthetic-account.serializer';
import { EditSyntheticAccountDto } from './dtos/edit-synt-account.dto';
import { CreateSyntheticAccountDto } from './dtos/create-synt-account.dto';
import { SyntheticAccount } from './entities/synthetic-account.entity';

@Injectable()
export class SyntheticAccountsService {
  constructor(
    @InjectRepository(SyntheticAccountsRepository)
    private readonly syntheticAccountsRepository: SyntheticAccountsRepository
  ) {}

  async getById(
    id: number,
    relations: string[] = [],
    throwsException = false
  ): Promise<SyntheticAccountEntity | null> {
    const syntheticAccount = await this.syntheticAccountsRepository.getById(
      id,
      relations,
      throwsException
    );
    return this.syntheticAccountsRepository.transform(syntheticAccount);
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<SyntheticAccountEntity[] | null> {
    const syntheticAccounts = await this.syntheticAccountsRepository.getAll(
      relations,
      throwsException
    );
    return this.syntheticAccountsRepository.transformMany(syntheticAccounts);
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

    const newSyntheticAccountInputs = {
      ...newSyntheticAccountData,
      byDebitAccounts,
      byCreditAccounts
    };

    const newSyntheticAccount = await this.syntheticAccountsRepository.createEntity(
      newSyntheticAccountInputs
    );
    return this.syntheticAccountsRepository.transform(newSyntheticAccount);
  }

  async update(
    accountId: number,
    inputs: EditSyntheticAccountDto
  ): Promise<SyntheticAccountEntity> {
    const account = await this.getById(accountId, [], true);
    if (inputs.number && inputs.number !== account.number) {
      await this.validateAccountNumberNotExist(inputs.number);
    }

    const {
      byDebitAccountsIds,
      byCreditAccountsIds,
      ...updatedSyntheticAccountData
    } = inputs;

    const updatedSyntheticAccountInputs = {
      byDebitAccounts: undefined,
      byCreditAccounts: undefined,
      ...updatedSyntheticAccountData
    };

    const isDebitAccountsChanged =
      byDebitAccountsIds && byDebitAccountsIds.length > 0;
    if (isDebitAccountsChanged) {
      updatedSyntheticAccountInputs.byDebitAccounts = await this.resolveLinkedSyntheticAccounts(
        byDebitAccountsIds
      );
    } else {
      delete updatedSyntheticAccountInputs.byDebitAccounts;
    }

    const isCreditAccountsChanged =
      byCreditAccountsIds && byCreditAccountsIds.length > 0;
    if (isCreditAccountsChanged) {
      updatedSyntheticAccountInputs.byCreditAccounts = await this.resolveLinkedSyntheticAccounts(
        byCreditAccountsIds
      );
    } else {
      delete updatedSyntheticAccountInputs.byCreditAccounts;
    }

    const updatedSyntheticAccount =
      isDebitAccountsChanged || isCreditAccountsChanged
        ? await this.syntheticAccountsRepository.updateNestedEntity(
            accountId,
            updatedSyntheticAccountInputs
          )
        : await this.syntheticAccountsRepository.updateEntity(
            accountId,
            updatedSyntheticAccountInputs
          );

    return this.syntheticAccountsRepository.transform(updatedSyntheticAccount);
  }

  async validateAccountNumberNotExist(number: number): Promise<void> {
    const accountWithNumber = await this.syntheticAccountsRepository.getOneWhere(
      {
        number
      }
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
        const resolvedAccount = await this.syntheticAccountsRepository.getById(
          accountId,
          [],
          true
        );
        resolvedSyntheticAccounts.push(resolvedAccount);
      })
    );

    return resolvedSyntheticAccounts;
  }

  async delete(entityId: number): Promise<SyntheticAccountEntity> {
    const deletionEntity = await this.syntheticAccountsRepository.getById(
      entityId,
      ['byDebitAccounts', 'byCreditAccounts']
    );
    if (deletionEntity) {
      const isCreditAccountsPopulated =
        deletionEntity.byCreditAccounts.length > 0;
      const isDebitAccountsPopulated =
        deletionEntity.byCreditAccounts.length > 0;

      if (isCreditAccountsPopulated || isDebitAccountsPopulated) {
        await this.syntheticAccountsRepository.deleteNestedEntity(
          deletionEntity
        );
      } else {
        await this.syntheticAccountsRepository.deleteEntity(deletionEntity.id);
      }
    }
    return deletionEntity
      ? this.syntheticAccountsRepository.transform(deletionEntity)
      : null;
  }
}
