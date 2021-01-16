import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import User from '../../users/entities/user.entity';

@Index('refresh_token_pkey', ['id'], { unique: true })
@Entity('refresh_tokens')
export default class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ name: 'is_revoked', type: 'boolean' })
  isRevoked: boolean;

  @Column({ name: 'expires', type: 'timestamp' })
  expires: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.refreshToken, { onDelete: 'SET NULL' })
  user: User | null;
}
