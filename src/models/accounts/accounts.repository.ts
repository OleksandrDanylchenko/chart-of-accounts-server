import { EntityRepository } from 'typeorm';
import { Account } from './entities/account.entity';
import { ModelRepository } from '../model.repository';
import {
  AccountEntity,
  allAccountGroupsForSerializing
} from './serializers/account.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(Account)
export class AccountsRepository extends ModelRepository<
  Account,
  AccountEntity
> {
  transform(model: Account): AccountEntity {
    const transformOptions = {
      groups: allAccountGroupsForSerializing
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
