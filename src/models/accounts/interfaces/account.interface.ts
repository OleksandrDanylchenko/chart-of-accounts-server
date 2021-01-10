import { ISyntheticAccount } from '../../syntheticAccounts/interfaces/synthetic-account.interface';

export interface IAccount {
  number: number;
  title: string;
  description: string;
  syntheticAccounts: ISyntheticAccount[];
}
