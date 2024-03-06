import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
  @ApiProperty({
    description: '사용자의 이메일',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '사용자의 패스워드. 영문, 숫자, 특수문자를 포함해야 합니다.',
    example: 'YourPassword123!',
    minLength: 8,
    maxLength: 20,
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,20}$',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, {
    message: '패스워드는 영문, 숫자, 특수문자를 포함한 8자에서 20자 사이여야 합니다.',
  })
  password: string;

  @ApiProperty({
    description: '사용자의 이름',
    example: '유승완',
    minLength: 2,
    maxLength: 10,
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;
}

export class SignInDto {
  @ApiProperty({
    description: '사용자의 이메일',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '사용자의 패스워드. 영문, 숫자, 특수문자를 포함해야 합니다.',
    example: 'YourPassword123!',
    minLength: 8,
    maxLength: 20,
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,20}$',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, {
    message: '패스워드는 영문, 숫자, 특수문자를 포함한 8자에서 20자 사이여야 합니다.',
  })
  password: string;
}
