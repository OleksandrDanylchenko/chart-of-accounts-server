import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import { classToPlain, plainToClass } from 'class-transformer';
import { SubAccount } from './entities/sub-account.entity';
import {
  allSubAccountGroups,
  SubAccountEntity
} from './serializers/sub-account.serializer';

@EntityRepository(SubAccount)
export class SubAccountsRepository extends ModelRepository<
  SubAccount,
  SubAccountEntity
> {
  transform(model: SubAccount): SubAccountEntity {
    const transformOptions = {
      groups: allSubAccountGroups
    };
    return plainToClass(
      SubAccountEntity,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }

  transformMany(models: SubAccount[]): SubAccountEntity[] {
    return models.map((model) => this.transform(model));
  }
}
