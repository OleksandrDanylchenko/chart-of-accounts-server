import { EntityRepository } from 'typeorm';
import { Account } from './entities/account.entity';
import { ModelRepository } from '../model.repository';
import {
  AccountEntity,
  allAccountGroups
} from './serializers/account.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(Account)
export class AccountsRepository extends ModelRepository<
  Account,
  AccountEntity
> {
  async getByNumber(number: number): Promise<AccountEntity> {
    const account = await this.findOne({ where: { number } });
    return this.transform(account);
  }

  transform(model: Account): AccountEntity {
    const transformOptions = {
      groups: allAccountGroups
    };
    return plainToClass(
      AccountEntity,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }

  transformMany(models: Account[]): AccountEntity[] {
    return models.map((model) => this.transform(model));
  }
}
