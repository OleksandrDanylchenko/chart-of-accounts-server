import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ISyntheticAccount } from '../interfaces/synthetic-account.interface';
import { ISubAccount } from '../../subAccounts/interfaces/sub-account.interface';
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
} from '../documentation/swagger-descriptors';

export const defaultSyntheticAccountGroups: string[] = [];
export const syntAccountWithLinkedSyntAccountsGroups: string[] = [
  ...defaultSyntheticAccountGroups,
  'syntheticAccount.linkedSyntheticAccounts'
];
export const syntAccountWithSubAccountsGroups: string[] = [
  ...defaultSyntheticAccountGroups,
  'syntheticAccount.subAccounts'
];
export const syntAccountWithLinkedSyntAccountsAndSubAccountsGroups: string[] = [
  ...syntAccountWithLinkedSyntAccountsGroups,
  ...syntAccountWithSubAccountsGroups
];
export const allSyntheticAccountGroups: string[] = [
  ...syntAccountWithLinkedSyntAccountsAndSubAccountsGroups
];

export class SyntheticAccountEntity
  extends ModelEntity
  implements ISyntheticAccount {
  @ApiResponseModelProperty(idField)
  @Expose()
  id: string;

  @ApiResponseModelProperty(numberField)
  @Expose()
  number: number;

  @ApiResponseModelProperty(titleField)
  @Expose()
  title: string;

  @ApiResponseModelProperty(descriptionField)
  @Expose()
  description: string;

  @ApiResponseModelProperty(accountIdField)
  @Expose()
  accountId: number;

  @ApiResponseModelProperty(subAccountsField)
  @Expose({ groups: ['syntheticAccount.subAccounts'] })
  subAccounts: ISubAccount[];

  @ApiResponseModelProperty(byDebitAccountsField)
  @Expose({ groups: ['syntheticAccount.linkedSyntheticAccounts'] })
  byDebitAccounts: ISyntheticAccount[];

  @ApiResponseModelProperty(byCreditAccountsField)
  @Expose({ groups: ['syntheticAccount.linkedSyntheticAccounts'] })
  byCreditAccounts: ISyntheticAccount[];
}
