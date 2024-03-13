import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IssuedCoupon } from './issued.coupon.entity';

export enum CouponType {
  PERCENT='percent',
  FIXED='fixed'
}

@Entity()
export class Coupon {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: CouponType,
  })
  type: CouponType;
  

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  isActive: boolean;

  @Column() // 발급 후 몇일동안 사용가능한지
  addDays: number;

  @Column() // 한사람당 발급가능 횟수
  limit: number;

  @OneToMany(() => IssuedCoupon, (coupon) => coupon.coupon)
  issuedCoupons: IssuedCoupon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
