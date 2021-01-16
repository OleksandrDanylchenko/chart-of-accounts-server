import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { RefreshTokenEntity } from '../serializers/refresh-token.serializer';
import {
  createdAtField,
  expiresField,
  idField,
  isRevokedField,
  updatedAtField,
  userField
} from './refresh-token.descriptors';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IUser } from '../../users/interfaces/user.interface';

export class AtomicRefreshToken extends OmitType(RefreshTokenEntity, [
  'user'
] as const) {
  @ApiResponseModelProperty(idField)
  id: number;

  @ApiResponseModelProperty(isRevokedField)
  isRevoked: boolean;

  @ApiResponseModelProperty(expiresField)
  expires: Date;

  @ApiResponseModelProperty(createdAtField)
  createdAt: Date;

  @ApiResponseModelProperty(updatedAtField)
  updatedAt: Date;
}

export class UserWithRefreshToken extends IntersectionType(
  AtomicRefreshToken,
  PickType(RefreshTokenEntity, ['user'] as const)
) {
  @ApiResponseModelProperty(userField)
  user: IUser;
}
