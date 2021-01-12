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
