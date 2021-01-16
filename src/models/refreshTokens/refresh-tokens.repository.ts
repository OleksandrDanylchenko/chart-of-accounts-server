import RefreshToken from './entities/refresh-token.entity';
import { Connection, EntityRepository, SelectQueryBuilder } from 'typeorm';
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
    const userToken = await this.findUserToken(user);
    await this.deleteNestedEntity(userToken);
  }

  async findUserToken(user: User): Promise<RefreshToken> {
    return this.findOne({
      relations: ['user'],
      where: (qb: SelectQueryBuilder<RefreshToken>) => {
        qb.where('RefreshToken__user.id = :user_id', { user_id: user.id });
      }
    });
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
