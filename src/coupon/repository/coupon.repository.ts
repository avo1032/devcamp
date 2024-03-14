import { DataSource, Repository } from 'typeorm';
import { Coupon, CouponType } from '../entity/coupon.entity';
import { Injectable } from '@nestjs/common';
import { createEntityId } from 'src/common/util/create.entity.id';

@Injectable()
export class CouponRepository {
  private couponRepository: Repository<Coupon>;

  constructor(private readonly dataSource: DataSource) {
    this.couponRepository = this.dataSource.getRepository(Coupon);
  }

  async createCoupon(
    type: CouponType,
    value: number,
    description: string,
    addDays: number,
    limit: number,
  ): Promise<Coupon> {
    return this.couponRepository.save({
      id: createEntityId(),
      type,
      value,
      description,
      addDays,
      limit,
      isActive: true,
    });
  }

  async findOneById(couponId: string) {
    return this.couponRepository.findOne({
      where: { id: couponId },
    });
  }
}
