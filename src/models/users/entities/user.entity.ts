import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import RefreshToken from '../../refreshTokens/entities/refresh-token.entity';

@Index('users_pkey', ['id', 'email'], { unique: true })
@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ name: 'email', type: 'text' })
  email: string;

  @Column({ name: 'password', type: 'text' })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'refresh_token_id', type: 'text', nullable: true })
  refreshTokenId: number;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn([{ name: 'refresh_token_id', referencedColumnName: 'id' }])
  refreshToken: RefreshToken;
}
