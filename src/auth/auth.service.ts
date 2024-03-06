import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/req.auth.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { addMinutes, addWeeks } from 'date-fns';
import { createEntityId } from 'src/common/util/create.entity.id';
import { User } from 'src/user/entity/uesr.entity';
import { RefreshTokenRepository } from 'src/user/repository/refresh.token.repository';
import * as argon2 from 'argon2';

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

  async signIn(body: SignInDto) {
    const { email, password } = body;
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    }
    if (!(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('비밀번호를 틀렸습니다.');
    }
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
        sub: email,
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
    const jti = user.refreshToken ? user.refreshToken.id : createEntityId();
    const expiredAt = addWeeks(new Date(), 1);
    const refreshToken = this.jwtService.sign(
      {
        id: jti,
        sub: user.email,
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
