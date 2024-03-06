import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/req.auth.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { addMinutes, addWeeks } from 'date-fns';
import { createEntityId } from 'src/common/util/create.entity.id';
import { User } from 'src/user/entity/uesr.entity';
import { RefreshTokenRepository } from 'src/user/repository/refresh.token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const { email, password, name } = body;
    const isExistEmail = await this.userRepository.findOneByEmail(email);
    if (!!isExistEmail) {
      throw new BadRequestException('이미 존재하는 이메일 입니다.');
    }
    const user = await this.userRepository.signUp(email, password, name);
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(email),
      this.createRefreshToken(user),
    ]);
    return { user, accessToken, refreshToken };
  }

  async createAccessToken(email: string) {
    return this.jwtService.sign(
      {
        id: createEntityId(),
        email,
        expiredAt: addMinutes(new Date(), 60),
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        algorithm: 'HS512',
        expiresIn: '60m',
      },
    );
  }

  async createRefreshToken(user: User) {
    const jti = createEntityId();
    const expiredAt = addWeeks(new Date(), 1);
    const refreshToken = this.jwtService.sign(
      {
        id: jti,
        expiredAt,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        algorithm: 'HS512',
        expiresIn: '60m',
      },
    );
    await this.refreshTokenRepository.createRefreshToken(jti, expiredAt, user);
    return refreshToken;
  }
}
