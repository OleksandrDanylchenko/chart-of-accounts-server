import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../serializers/user.serializers';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  createdAtField,
  emailField,
  passwordField,
  updatedAtField
} from './user-fields.descriptors';

export class AtomicUser extends OmitType(UserEntity, ['password'] as const) {
  @ApiResponseModelProperty(emailField)
  email: string;

  @ApiResponseModelProperty(createdAtField)
  createdAt: Date;

  @ApiResponseModelProperty(updatedAtField)
  updatedAt: Date;
}

export class UserWithPassword extends IntersectionType(
  AtomicUser,
  PickType(AtomicUser, ['password'] as const)
) {
  @ApiResponseModelProperty(passwordField)
  password: string;
}
