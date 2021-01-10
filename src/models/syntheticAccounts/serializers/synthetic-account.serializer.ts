import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ISyntheticAccount } from '../interfaces/synthetic-account.interface';
import { ISubAccount } from '../../subAccounts/interfaces/sub-account.interface';

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
  @Expose()
  id: string;

  @Expose()
  number: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  accountId: number;

  @Expose({ groups: ['syntheticAccount.subAccounts'] })
  subAccounts: ISubAccount[];

  @Expose({ groups: ['syntheticAccount.linkedSyntheticAccounts'] })
  byDebitAccounts: ISyntheticAccount[];

  @Expose({ groups: ['syntheticAccount.linkedSyntheticAccounts'] })
  byCreditAccounts: ISyntheticAccount[];
}
