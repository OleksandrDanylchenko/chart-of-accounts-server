import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import { classToPlain, plainToClass } from 'class-transformer';
import { SyntheticAccount } from './entities/synthetic-account.entity';
import {
  allSyntheticAccountGroups,
  SyntheticAccountEntity
} from './serializers/synthetic-account.serializer';

@EntityRepository(SyntheticAccount)
export class SyntheticAccountsRepository extends ModelRepository<
  SyntheticAccount,
  SyntheticAccountEntity
> {
  async getByNumber(number: number): Promise<SyntheticAccountEntity> {
    const account = await this.findOne({ where: { number } });
    return this.transform(account);
  }

  transform(model: SyntheticAccount): SyntheticAccountEntity {
    const transformOptions = {
      groups: allSyntheticAccountGroups
    };
    return plainToClass(
      SyntheticAccountEntity,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }

  transformMany(models: SyntheticAccount[]): SyntheticAccountEntity[] {
    return models.map((model) => this.transform(model));
  }
}
