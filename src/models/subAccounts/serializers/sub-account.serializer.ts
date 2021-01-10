import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ISubAccount } from '../interfaces/sub-account.interface';

export const defaultSubAccountGroupsForSerializing: string[] = [];
export const allAccountGroupsForSerializing: string[] = [
  ...defaultSubAccountGroupsForSerializing
];

export class SubAccountEntity extends ModelEntity implements ISubAccount {
  @Expose()
  id: string;

  @Expose()
  number: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  syntheticAccountId: number;
}
