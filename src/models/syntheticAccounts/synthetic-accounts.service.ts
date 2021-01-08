import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SyntheticAccountsRepository } from './synthetic-accounts.repository';
import { SyntheticAccountEntity } from './serializers/synthetic-account.serializer';

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
}
