import { SyntheticAccountEntity } from '../serializers/synthetic-account.serializer';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  accountIdField,
  byCreditAccountsField,
  byDebitAccountsField,
  descriptionField,
  idField,
  numberField,
  subAccountsField,
  titleField
} from './synthetic-account-fields.descriptors';
import { OmitType } from '@nestjs/swagger';
import { ISubAccount } from '../../subAccounts/interfaces/sub-account.interface';
import { ISyntheticAccount } from '../interfaces/synthetic-account.interface';

export class AtomicSyntheticAccount extends OmitType(SyntheticAccountEntity, [
  'subAccounts',
  'byDebitAccounts',
  'byCreditAccounts'
] as const) {
  @ApiResponseModelProperty(idField)
  id: string;

  @ApiResponseModelProperty(numberField)
  number: number;

  @ApiResponseModelProperty(titleField)
  title: string;

  @ApiResponseModelProperty(descriptionField)
  description: string;

  @ApiResponseModelProperty(accountIdField)
  accountId: number;
}

export class SyntheticAccountWithLinkedSyntAccounts extends OmitType(
  SyntheticAccountEntity,
  ['subAccounts'] as const
) {
  @ApiResponseModelProperty(idField)
  id: string;

  @ApiResponseModelProperty(numberField)
  number: number;

  @ApiResponseModelProperty(titleField)
  title: string;

  @ApiResponseModelProperty(descriptionField)
  description: string;

  @ApiResponseModelProperty(accountIdField)
  accountId: number;

  @ApiResponseModelProperty(byDebitAccountsField)
  byDebitAccounts: ISyntheticAccount[];

  @ApiResponseModelProperty(byCreditAccountsField)
  byCreditAccounts: ISyntheticAccount[];
}

export class SyntheticAccountWithSubAccounts extends OmitType(
  SyntheticAccountEntity,
  ['byDebitAccounts', 'byCreditAccounts'] as const
) {
  @ApiResponseModelProperty(idField)
  id: string;

  @ApiResponseModelProperty(numberField)
  number: number;

  @ApiResponseModelProperty(titleField)
  title: string;

  @ApiResponseModelProperty(descriptionField)
  description: string;

  @ApiResponseModelProperty(accountIdField)
  accountId: number;

  @ApiResponseModelProperty(subAccountsField)
  subAccounts: ISubAccount[];
}

export class SyntheticAccountWithSubAccountsAndLinkedSyntAccounts extends SyntheticAccountEntity {
  @ApiResponseModelProperty(idField)
  id: string;

  @ApiResponseModelProperty(numberField)
  number: number;

  @ApiResponseModelProperty(titleField)
  title: string;

  @ApiResponseModelProperty(descriptionField)
  description: string;

  @ApiResponseModelProperty(accountIdField)
  accountId: number;

  @ApiResponseModelProperty(subAccountsField)
  subAccounts: ISubAccount[];

  @ApiResponseModelProperty(byDebitAccountsField)
  byDebitAccounts: ISyntheticAccount[];

  @ApiResponseModelProperty(byCreditAccountsField)
  byCreditAccounts: ISyntheticAccount[];
}
