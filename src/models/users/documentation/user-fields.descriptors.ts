import { ApiPropertyOptions } from '@nestjs/swagger';

export const emailField: ApiPropertyOptions = {
  description: "User's email",
  type: String
};

export const passwordField: ApiPropertyOptions = {
  description: "User's password (minimum 5 characters)",
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

export const refreshTokenIdField: ApiPropertyOptions = {
  description: 'Id of linked refresh token entity',
  default: 1,
  type: Number
};

export const refreshTokenField: ApiPropertyOptions = {
  description: 'Linked refresh token entity',
  default: 1,
  type: Number
};
