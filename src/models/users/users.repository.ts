import User from './entities/user.entity';
import { Connection, EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import { allUserGroups, UserEntity } from './serializers/user.serializers';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
  transform(model: User): UserEntity {
    const transformOptions = {
      groups: allUserGroups
    };
    return plainToClass(
      UserEntity,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }
  transformMany(models: User[]): UserEntity[] {
    return models.map((model) => this.transform(model));
  }
}

export const UsersRepositoryProvider = {
  provide: UsersRepository,
  useFactory: (connection: Connection): UsersRepository =>
    connection.getCustomRepository(UsersRepository),
  inject: [Connection]
};
