import { Injectable } from '@nestjs/common';
import { CouponRepository } from './repository/coupon.repository';
import { CreateCouponDto } from './dto/req.coupon.dto';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async createCoupon(body: CreateCouponDto) {
    const { type, value, description, addDays, limit } = body;
    return await this.couponRepository.createCoupon(type, value, description, addDays, limit);
  }
}
