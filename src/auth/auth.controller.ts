import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/req.auth.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignResponse, SignResponseDto } from './dto/res.auth.dto';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from './jwt/jwt.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@User() user) {
    return this.authService.refresh(user);
  }
}
