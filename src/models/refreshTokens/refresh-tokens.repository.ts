import RefreshToken from './entities/refresh-token.entity';
import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import {
  allRefreshTokenGroups,
  RefreshTokenEntity
} from './serializers/refresh-token.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends ModelRepository<
  RefreshToken,
  RefreshTokenEntity
> {
  transform(model: RefreshToken): RefreshTokenEntity {
    const transformOptions = {
      groups: allRefreshTokenGroups
    };
    return plainToClass(
      RefreshTokenEntity,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }
  transformMany(models: RefreshToken[]): RefreshTokenEntity[] {
    return models.map((model) => this.transform(model));
  }
}
