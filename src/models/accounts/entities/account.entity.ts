import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn
} from 'typeorm';

@Index('accounts_pkey', ['id'], { unique: true })
@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'text', name: 'number' })
  number: number;

  @Column({ type: 'text', name: 'title' })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;
}
