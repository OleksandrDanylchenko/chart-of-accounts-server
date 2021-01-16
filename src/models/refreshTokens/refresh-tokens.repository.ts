import RefreshToken from './entities/refresh-token.entity';
import { Connection, EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import {
  allRefreshTokenGroups,
  RefreshTokenEntity
} from './serializers/refresh-token.serializer';
import { classToPlain, plainToClass } from 'class-transformer';
import User from '../users/entities/user.entity';

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends ModelRepository<
  RefreshToken,
  RefreshTokenEntity
> {
  async deleteUserTokens(user: User): Promise<void> {
    const userTokens = await this.find({ where: { user: { id: user.id } } });
    if (userTokens) {
      userTokens.forEach((userToken) => this.deleteNestedEntity(userToken));
    }
  }

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

export const RefreshTokensRepositoryProvider = {
  provide: RefreshTokensRepository,
  useFactory: (connection: Connection): RefreshTokensRepository =>
    connection.getCustomRepository(RefreshTokensRepository),
  inject: [Connection]
};
