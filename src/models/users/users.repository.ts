import User from './entities/user.entity';
import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import { allUserGroups, UserEntity } from './serializers/user.serializers';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.findOne({ where: { email } });
    return this.transform(user);
  }

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
