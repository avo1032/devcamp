import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon } from './entity/coupon.entity';
import { IssuedCoupon } from './entity/issued.coupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponRepository } from './repository/coupon.repository';
import { IssuedCouponRepository } from './repository/issued.coupon.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, IssuedCoupon])],
  controllers: [CouponController],
  providers: [CouponService, CouponRepository, IssuedCouponRepository, JwtService],
})
export class CouponModule {}
