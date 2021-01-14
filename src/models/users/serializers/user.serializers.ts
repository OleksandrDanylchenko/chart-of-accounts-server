import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { IUser } from '../interfaces/user.interface';
import { IRefreshToken } from '../../refreshTokens/interfaces/refresh-token.interface';

export const defaultUserGroups: string[] = ['user.timestamps'];
export const userWithRefreshTokenGroups: string[] = [
  ...defaultUserGroups,
  'user.refreshToken'
];
export const allUserGroups: string[] = [
  ...userWithRefreshTokenGroups,
  'user.password'
];

export class UserEntity extends ModelEntity implements IUser {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose({ groups: ['user.refreshToken'] })
  refreshTokenId: number | null;

  @Expose({ groups: ['user.refreshToken'] })
  refreshToken: IRefreshToken | null;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
