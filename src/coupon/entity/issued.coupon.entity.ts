import { User } from 'src/user/entity/uesr.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';

export enum CouponStatus {
  READY = 'ready', // 사용가능상태
  USED = 'used', // 사용하여 사용불가능 상태
}

@Entity()
export class IssuedCoupon {
  @PrimaryColumn()
  id: string;

  @Column()
  validUntil: Date;

  @Column()
  status: CouponStatus;

  @ManyToOne(() => User, (user) => user.coupons)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.issuedCoupons)
  @JoinColumn()
  coupon: Coupon;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  use() {
    this.status = CouponStatus.USED;
  }
}
