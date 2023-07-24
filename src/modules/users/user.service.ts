import { Injectable } from '@nestjs/common';
import { User } from 'entities';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  findOneByEmail(email: string) {
    const user = this.dataSource.getRepository(User).findOneBy({ email });
    return user;
  }
}
