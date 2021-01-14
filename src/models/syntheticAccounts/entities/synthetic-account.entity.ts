import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { SubAccount } from '../../subAccounts/entities/sub-account.entity';

@Index('synthetic_accounts_pkey', ['id'], { unique: true })
@Entity('synthetic_accounts')
export class SyntheticAccount extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'number', type: 'integer', unique: true })
  number: number;

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'account_id', type: 'integer' })
  accountId: number;

  @ManyToOne(() => Account, (account) => account.syntheticAccounts)
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;

  @OneToMany(() => SubAccount, (subAccount) => subAccount.syntheticAccount)
  subAccounts: SubAccount[];

  @ManyToMany(() => SyntheticAccount)
  @JoinTable()
  byDebitAccounts: SyntheticAccount[];

  @ManyToMany(() => SyntheticAccount)
  @JoinTable()
  byCreditAccounts: SyntheticAccount[];
}
