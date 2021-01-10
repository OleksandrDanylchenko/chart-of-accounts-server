import { ISubAccount } from '../../subAccounts/interfaces/sub-account.interface';

export interface ISyntheticAccount {
  number: number;
  title: string;
  description: string;
  accountId: number;
  subAccounts: ISubAccount[];
  byDebitAccounts: ISyntheticAccount[];
  byCreditAccounts: ISyntheticAccount[];
}
