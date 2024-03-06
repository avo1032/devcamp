import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/req.auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignResponse, SignResponseDto } from './dto/res.auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse(SignResponse)
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto): Promise<SignResponseDto> {
    return this.authService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse(SignResponse)
  @Post('sign-in')
  async signIn(@Body() body: SignInDto): Promise<SignResponseDto> {
    return this.authService.signIn(body);
  }
}
