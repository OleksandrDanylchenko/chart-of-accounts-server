import { ApiPropertyOptions } from '@nestjs/swagger';
import { AtomicSubAccount } from '../../subAccounts/documents/sub-account.descriptors';
import { AtomicSyntheticAccount } from './synthetic-account.descriptors';

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
  type: [AtomicSubAccount]
};

export const byDebitAccountsIdsField: ApiPropertyOptions = {
  description: 'Linked by debit synthetic accounts ids',
  required: false,
  type: [Number]
};

export const byDebitAccountsField: ApiPropertyOptions = {
  description: 'Linked by debit synthetic accounts',
  required: false,
  type: () => AtomicSyntheticAccount,
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
  type: () => AtomicSyntheticAccount,
  isArray: true
};
