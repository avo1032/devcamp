import { Injectable } from '@nestjs/common';
import { CouponStatus, IssuedCoupon } from '../entity/issued.coupon.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entity/uesr.entity';
import { Coupon } from '../entity/coupon.entity';
import { createEntityId } from 'src/common/util/create.entity.id';
import { addDays } from 'date-fns';

@Injectable()
export class IssuedCouponRepository {
  private issuedCouponRepository: Repository<IssuedCoupon>;

  constructor(private readonly dataSource: DataSource) {
    this.issuedCouponRepository = this.dataSource.getRepository(IssuedCoupon);
  }

  async createIssuedCoupon(user: User, coupon: Coupon) {
    const issuedCoupon = this.issuedCouponRepository.create({
      id: createEntityId(),
      validUntil: addDays(new Date(), coupon.addDays),
      status: CouponStatus.READY,
      user,
      coupon,
    });

    return issuedCoupon;
  }

  async isLimitedCoupon(user: User, coupon: Coupon) {
    const issuedCoupon = this.issuedCouponRepository.find({
      where: { user, coupon },
    });
    return coupon.limit > (await issuedCoupon).length ? true : false;
  }
}
