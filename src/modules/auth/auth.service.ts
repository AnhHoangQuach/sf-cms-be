import { JwtService } from '@nestjs/jwt';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { LoginDto } from './dto';
import { User } from 'entities';
import { DataSource } from 'typeorm';
import { BaseResultDto } from 'common';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<BaseResultDto<any>> {
    const { email, password } = body;
    const user = await this.dataSource.getRepository(User).findOneBy({ email });

    if (!user || !user.validatePassword(password))
      throw new NotAcceptableException('Wrong email or password');

    const payload = {
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);
    return new BaseResultDto({ accessToken });
  }
}
