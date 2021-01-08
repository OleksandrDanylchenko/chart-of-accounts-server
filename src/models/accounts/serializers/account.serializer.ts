import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { IAccount } from '../interfaces/account.interface';

export const defaultAccountGroupsForSerializing: string[] = [];
export const extendedAccountGroupsForSerializing: string[] = [
  ...defaultAccountGroupsForSerializing
];
export const allAccountGroupsForSerializing: string[] = [
  ...extendedAccountGroupsForSerializing,
  'account.syntheticAccounts'
];

export class AccountEntity extends ModelEntity implements IAccount {
  id: string;
  number: number;
  title: string;
  description: string;
  // TODO Add synt accounts
}
