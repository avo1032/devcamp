import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/uesr.entity';
import { createEntityId } from 'src/common/util/create.entity.id';
import * as argon2 from 'argon2';

@Injectable()
export class UserRepository {
  private userRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async signUp(email: string, password: string, name: string) {
    return this.userRepository.save({
      id: createEntityId(),
      password: await argon2.hash(password),
      email,
      name,
    });
  }
}
