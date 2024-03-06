import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './uesr.entity';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column()
  sub: string;

  @Column()
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.refreshToken, { eager: true })
  @JoinColumn()
  user: User;
}
