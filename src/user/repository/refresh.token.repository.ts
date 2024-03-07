import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refresh.token.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/uesr.entity';

@Injectable()
export class RefreshTokenRepository {
  private refreshTokenRepository: Repository<RefreshToken>;

  constructor(private readonly dataSource: DataSource) {
    this.refreshTokenRepository = this.dataSource.getRepository(RefreshToken);
  }

  async createRefreshToken(id: string, expiredAt: Date, user: User) {
    return this.refreshTokenRepository.save({
      id,
      sub: user.email,
      expiredAt,
      user,
    });
  }
}
