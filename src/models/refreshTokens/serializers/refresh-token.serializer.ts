import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { IRefreshToken } from '../interfaces/refresh-token.interface';
import { IUser } from '../../users/interfaces/user.interface';

export const defaultRefreshTokenGroups: string[] = ['refresh_token.timestamps'];
export const refreshTokenWithUserGroups: string[] = [
  ...defaultRefreshTokenGroups,
  'refresh_token.user'
];
export const allRefreshTokenGroups: string[] = [...refreshTokenWithUserGroups];

export class RefreshTokenEntity extends ModelEntity implements IRefreshToken {
  @Expose()
  id: string;

  @Expose()
  isRevoked: boolean;

  @Expose()
  expires: Date;

  @Expose({ groups: ['refresh_token.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['refresh_token.timestamps'] })
  updatedAt: Date;

  @Expose({ groups: ['refresh_token.user'] })
  user: IUser | null;
}
