import { ApiProperty } from "@nestjs/swagger";
import { CouponType } from "../entity/coupon.entity";
import { IsEnum, IsInt, IsPositive, IsString, Min } from "class-validator";

export class CreateCouponDto {
  @ApiProperty({
    description: '쿠폰의 타입 (할인율 또는 현금 할인) percent, fixed',
    example: 'fixed',
    required: true,
  })
  @IsEnum(CouponType, {
    message: '쿠폰 타입은 percent 또는 fixed 여야 합니다.',
  })
  type: CouponType;

  @ApiProperty({
    description: '쿠폰의 할인 값 (할인율 또는 할인 금액)',
    example: 10,
    required: true,
  })
  @IsInt({ message: '쿠폰 값은 정수여야 합니다.' })
  @Min(1, { message: '쿠폰 값은 최소 1 이상이어야 합니다.' })
  value: number;

  @ApiProperty({
    description: '쿠폰에 대한 설명',
    example: '신규 가입자를 위한 10% 할인 쿠폰',
    required: true,
  })
  @IsString({ message: '쿠폰 설명은 문자열이어야 합니다.' })
  description: string;

  @ApiProperty({
    description: '쿠폰 유효 기간 (발급일로부터 몇 일간 유효한지)',
    example: 30,
    required: true,
  })
  @IsInt({ message: '유효 기간은 정수여야 합니다.' })
  @IsPositive({ message: '유효 기간은 양수여야 합니다.' })
  addDays: number;

  @ApiProperty({
    description: '유저당 발급 가능한 최대 쿠폰 수',
    example: 1,
    required: true,
  })
  @IsInt({ message: '발급 가능 횟수는 정수여야 합니다.' })
  @Min(1, { message: '발급 가능 횟수는 최소 1 이상이어야 합니다.' })
  limit: number;
}