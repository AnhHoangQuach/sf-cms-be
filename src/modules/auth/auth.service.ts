import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseResult } from 'src/dtos';
import { UsersService } from '../users/user.service';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(body: LoginDto): Promise<BaseResult<any>> {
    const { username, password } = body;
    const user = await this.userService.findOne({ username });

    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    if (!(await user.comparePassword(password)))
      throw new NotAcceptableException('Sai mật khẩu');

    const payload = {
      sub: user.username,
    };
    await user.save();
    const accessToken = this.jwtService.sign(payload);
    return new BaseResult({ accessToken });
  }
}
