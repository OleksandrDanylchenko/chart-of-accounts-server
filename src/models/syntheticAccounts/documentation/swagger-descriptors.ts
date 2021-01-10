import { ApiPropertyOptions } from '@nestjs/swagger';
import { SyntheticAccountEntity } from '../serializers/synthetic-account.serializer';
import { SubAccountEntity } from '../../subAccounts/serializers/sub-account.serializer';

export const idField: ApiPropertyOptions = {
  description: 'ID of the synthetic account',
  minimum: 1,
  default: 1,
  required: true,
  type: Number
};

export const numberField: ApiPropertyOptions = {
  description: 'Number of the synthetic account',
  minimum: 1,
  default: 1,
  required: true,
  type: Number
};

export const titleField: ApiPropertyOptions = {
  description: 'Title of the synthetic account',
  required: true,
  type: String
};

export const descriptionField: ApiPropertyOptions = {
  description: 'Description of the synthetic account',
  required: true,
  type: String
};

export const accountIdField: ApiPropertyOptions = {
  description: 'Parent account id',
  required: false,
  default: 1,
  type: Number
};

export const subAccountsField: ApiPropertyOptions = {
  description: 'List of linked sub-accounts',
  required: false,
  type: [SubAccountEntity]
};

export const byDebitAccountsIdsField: ApiPropertyOptions = {
  description: 'Linked by debit synthetic accounts ids',
  required: false,
  type: [Number]
};

export const byDebitAccountsField: ApiPropertyOptions = {
  description: 'Linked by debit synthetic accounts',
  required: false,
  type: () => SyntheticAccountEntity,
  isArray: true
};

export const byCreditAccountsIdsField: ApiPropertyOptions = {
  description: 'Linked by credit synthetic account ids',
  required: false,
  type: [Number]
};

export const byCreditAccountsField: ApiPropertyOptions = {
  description: 'Linked by credit synthetic accounts',
  required: false,
  type: () => SyntheticAccountEntity,
  isArray: true
};
