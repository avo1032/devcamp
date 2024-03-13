import { Injectable } from "@nestjs/common";
import { IssuedCoupon } from "../entity/issued.coupon.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class IssuedCouponRepository {
  private issuedCouponRepository: Repository<IssuedCoupon>;

  constructor(private readonly dataSource: DataSource) {
    this.issuedCouponRepository = this.dataSource.getRepository(IssuedCoupon);
  }
}
