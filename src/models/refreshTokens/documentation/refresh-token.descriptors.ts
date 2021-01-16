import { ApiPropertyOptions } from '@nestjs/swagger';
import { AtomicUser } from '../../users/documentation/user.descriptors';

export const idField: ApiPropertyOptions = {
  description: 'ID of refresh token',
  type: Number
};

export const isRevokedField: ApiPropertyOptions = {
  description: "Flag indicating whether user's refresh token was revoked",
  type: Boolean
};

export const expiresField: ApiPropertyOptions = {
  description: "Expiration timestamp of the user's refresh token",
  type: Date
};

export const createdAtField: ApiPropertyOptions = {
  description: 'Timestamp of user creation',
  type: Date
};

export const updatedAtField: ApiPropertyOptions = {
  description: 'Timestamp of user update',
  type: Date
};

export const userField: ApiPropertyOptions = {
  description: 'Linked user entity',
  type: AtomicUser
};
