import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { IUser } from '../interfaces/user.interface';

export const defaultUserGroups: string[] = ['user.timestamps'];
export const allUserGroups: string[] = [...defaultUserGroups, 'user.password'];

export class UserEntity extends ModelEntity implements IUser {
  @Expose()
  email: string;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
