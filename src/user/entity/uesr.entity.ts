import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RefreshToken } from './refresh.token.entity';
import { Product } from 'src/product/entity/product.entity';
import { IssuedCoupon } from 'src/coupon/entity/issued.coupon.entity';

export type Role = 'admin';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('simple-array', { nullable: true })
  roles: Role[];

  @Column()
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @OneToMany(() => IssuedCoupon, (coupon) => coupon.user)
  coupons: IssuedCoupon[];
}
