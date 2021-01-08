export interface ISyntheticAccount {
  number: number;
  title: string;
  description: string;
  accountId: number;
  byDebitAccounts: ISyntheticAccount[];
  byCreditAccounts: ISyntheticAccount[];
}
