import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../serializers/user.serializers';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  createdAtField,
  emailField,
  idField,
  passwordField,
  refreshTokenField,
  refreshTokenIdField,
  updatedAtField
} from './user-fields.descriptors';
import { IRefreshToken } from '../../refreshTokens/interfaces/refresh-token.interface';

export class AtomicUser extends OmitType(UserEntity, [
  'password',
  'refreshTokenId',
  'refreshToken'
] as const) {
  @ApiResponseModelProperty(idField)
  id: number;

  @ApiResponseModelProperty(emailField)
  email: string;

  @ApiResponseModelProperty(createdAtField)
  createdAt: Date;

  @ApiResponseModelProperty(updatedAtField)
  updatedAt: Date;
}

export class UserWithRefreshToken extends IntersectionType(
  AtomicUser,
  PickType(UserEntity, ['refreshTokenId', 'refreshToken'] as const)
) {
  @ApiResponseModelProperty(refreshTokenIdField)
  refreshTokenId: number;

  @ApiResponseModelProperty(refreshTokenField)
  refreshToken: IRefreshToken;
}

export class UserWithPassword extends IntersectionType(
  AtomicUser,
  PickType(UserEntity, ['password'] as const)
) {
  @ApiResponseModelProperty(passwordField)
  password: string;
}

export class UserWithPasswordAndRefreshToken extends IntersectionType(
  UserWithRefreshToken,
  UserWithPassword
) {}
