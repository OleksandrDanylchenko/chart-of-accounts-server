import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { IRefreshToken } from '../interfaces/refresh-token.interface';

export const defaultUserGroups: string[] = ['refresh_token.timestamps'];
export const allUserGroups: string[] = [...defaultUserGroups];

export class RefreshTokenEntity extends ModelEntity implements IRefreshToken {
  @Expose()
  id: string;

  @Expose()
  isRevoked: boolean;

  @Expose()
  userId: number;

  @Expose()
  expires: Date;

  @Expose({ groups: ['refresh_token.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['refresh_token.timestamps'] })
  updatedAt: Date;
}
