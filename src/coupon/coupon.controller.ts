import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/req.coupon.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { User } from 'src/user/entity/uesr.entity';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCoupon(@Body() body: CreateCouponDto) {
    return this.couponService.createCoupon(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('issued/:couponId')
  async createIssuedCoupon(@Param() couponId: string, @UserInfo() user: User) {
    return this.couponService.createIssuedCoupon(user, couponId);
  }
}
