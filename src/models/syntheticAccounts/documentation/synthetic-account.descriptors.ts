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
import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { ISubAccount } from '../../subAccounts/interfaces/sub-account.interface';
import { ISyntheticAccount } from '../interfaces/synthetic-account.interface';
import { AccountEntity } from '../../accounts/serializers/account.serializer';

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

export class SyntheticAccountWithLinkedSyntAccounts extends IntersectionType(
  AtomicSyntheticAccount,
  PickType(AccountEntity, ['byDebitAccounts', 'byCreditAccounts'] as const)
) {
  @ApiResponseModelProperty(byDebitAccountsField)
  byDebitAccounts: ISyntheticAccount[];

  @ApiResponseModelProperty(byCreditAccountsField)
  byCreditAccounts: ISyntheticAccount[];
}

export class SyntheticAccountWithSubAccounts extends IntersectionType(
  AtomicSyntheticAccount,
  PickType(AccountEntity, ['subAccounts'] as const)
) {
  @ApiResponseModelProperty(subAccountsField)
  subAccounts: ISubAccount[];
}

export class SyntheticAccountWithSubAccountsAndLinkedSyntAccounts extends IntersectionType(
  SyntheticAccountWithLinkedSyntAccounts,
  SyntheticAccountWithSubAccounts
) {}
