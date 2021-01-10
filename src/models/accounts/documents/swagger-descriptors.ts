import { SyntheticAccountEntity } from '../../syntheticAccounts/serializers/synthetic-account.serializer';
import { ApiPropertyOptions } from '@nestjs/swagger';

export const idField: ApiPropertyOptions = {
  description: 'ID of the account',
  minimum: 1,
  default: 1,
  required: true,
  type: Number
};

export const numberField: ApiPropertyOptions = {
  description: 'Number of the account',
  minimum: 1,
  default: 1,
  required: true,
  type: Number
};

export const titleField: ApiPropertyOptions = {
  description: 'Title of the account',
  required: true,
  type: String
};

export const descriptionField: ApiPropertyOptions = {
  description: 'Description of the account',
  required: true,
  type: String
};

export const syntheticAccountsField: ApiPropertyOptions = {
  description: 'List of linked synthetic accounts',
  required: false,
  type: [SyntheticAccountEntity]
};
