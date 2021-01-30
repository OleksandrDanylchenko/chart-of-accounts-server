import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { SyntheticAccount } from '../../syntheticAccounts/entities/synthetic-account.entity';

@Index('sub_accounts_pkey', ['id'], { unique: true })
@Entity('sub_accounts')
export class SubAccount extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'integer', name: 'number', unique: true })
  number: number;

  @Column({ type: 'text', name: 'title' })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'integer', name: 'synthetic_account_id' })
  syntheticAccountId: number;

  @ManyToOne(
    () => SyntheticAccount,
    (syntheticAccount) => syntheticAccount.subAccounts
  )
  @JoinColumn([{ name: 'synthetic_account_id', referencedColumnName: 'id' }])
  syntheticAccount: SyntheticAccount;
}
