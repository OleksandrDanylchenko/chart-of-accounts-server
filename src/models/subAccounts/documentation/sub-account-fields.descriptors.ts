import { ApiPropertyOptions } from '@nestjs/swagger';

export const idField: ApiPropertyOptions = {
  description: 'ID of the sub-account',
  minimum: 1,
  default: 1,
  type: Number
};

export const numberField: ApiPropertyOptions = {
  description: 'Number of the sub-account',
  minimum: 1,
  default: 1,
  type: Number
};

export const titleField: ApiPropertyOptions = {
  description: 'Title of the sub-account',
  type: String
};

export const descriptionField: ApiPropertyOptions = {
  description: 'Description of the sub-account',
  type: String
};

export const syntheticAccountIdField: ApiPropertyOptions = {
  description: 'Parent synthetic account id',
  default: 1,
  type: Number
};
