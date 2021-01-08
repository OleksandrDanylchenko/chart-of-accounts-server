import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ISyntheticAccount } from '../interfaces/synthetic-account.interface';

export const defaultAccountGroupsForSerializing: string[] = [];
export const extendedAccountGroupsForSerializing: string[] = [
  ...defaultAccountGroupsForSerializing,
  'syntheticAccounts.linkedSyntheticAccounts'
];
export const allAccountGroupsForSerializing: string[] = [
  ...extendedAccountGroupsForSerializing
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

  @Expose({ groups: ['syntheticAccount.linkedSyntheticAccounts'] })
  byDebitAccounts: ISyntheticAccount[];

  @Expose({ groups: ['syntheticAccount.linkedSyntheticAccounts'] })
  byCreditAccounts: ISyntheticAccount[];
}
