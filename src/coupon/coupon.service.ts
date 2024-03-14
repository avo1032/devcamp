import { BadRequestException, Injectable } from '@nestjs/common';
import { CouponRepository } from './repository/coupon.repository';
import { CreateCouponDto } from './dto/req.coupon.dto';
import { User } from 'src/user/entity/uesr.entity';
import { IssuedCouponRepository } from './repository/issued.coupon.repository';

@Injectable()
export class CouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly issuedCouponRepository: IssuedCouponRepository,
  ) {}

  async createCoupon(body: CreateCouponDto) {
    const { type, value, description, addDays, limit } = body;
    return await this.couponRepository.createCoupon(
      type,
      value,
      description,
      addDays,
      limit,
    );
  }

  async createIssuedCoupon(user: User, couponId: string) {
    const coupon = await this.couponRepository.findOneById(couponId);
    const isLimitedCoupon = await this.issuedCouponRepository.isLimitedCoupon(
      user,
      coupon,
    );
    if (!isLimitedCoupon) {
      throw new BadRequestException('발급 횟수를 초과하였습니다.');
    }
    const issuedCoupon = await this.issuedCouponRepository.createIssuedCoupon(
      user,
      coupon,
    );

    return issuedCoupon;
  }
}
