import { ApiPropertyOptions } from '@nestjs/swagger';
import { AtomicRefreshToken } from '../../refreshTokens/documentation/refresh-token-fields.descriptors';

export const idField: ApiPropertyOptions = {
  description: "User's id",
  type: Number
};

export const emailField: ApiPropertyOptions = {
  description: "User's email",
  type: String
};

export const passwordField: ApiPropertyOptions = {
  description: "User's password (minimum 5 characters)",
  type: String
};

export const registrationSecretField: ApiPropertyOptions = {
  description: 'Secret registration token, which is issued by administrator',
  type: String
};

export const createdAtField: ApiPropertyOptions = {
  description: 'Timestamp of user creation',
  type: Date
};

export const updatedAtField: ApiPropertyOptions = {
  description: 'Timestamp of user update',
  type: Date
};

export const refreshTokenIdField: ApiPropertyOptions = {
  description: 'Id of linked refresh token entity',
  default: 1,
  type: Number
};

export const refreshTokenField: ApiPropertyOptions = {
  description: 'Linked refresh token entity',
  default: 1,
  type: AtomicRefreshToken
};
