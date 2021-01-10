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
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'integer', name: 'number', unique: true })
  number: number;

  @Column({ type: 'text', name: 'title' })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'integer', name: 'account_id' })
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
