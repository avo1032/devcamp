import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/req.coupon.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCoupon(@Body() body: CreateCouponDto) {
    return this.couponService.createCoupon(body);
  }
}
