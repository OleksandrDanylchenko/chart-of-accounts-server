import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { IAccount } from '../interfaces/account.interface';
import { ISyntheticAccount } from '../../syntheticAccounts/interfaces/synthetic-account.interface';

export const defaultAccountGroupsForSerializing: string[] = [];
export const extendedAccountGroupsForSerializing: string[] = [
  ...defaultAccountGroupsForSerializing
];
export const allAccountGroupsForSerializing: string[] = [
  ...extendedAccountGroupsForSerializing,
  'account.linkedSyntheticAccounts'
];

export class AccountEntity extends ModelEntity implements IAccount {
  @Expose()
  id: string;

  @Expose()
  number: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose({ groups: ['account.linkedSyntheticAccounts'] })
  syntheticAccounts: ISyntheticAccount[];
}
