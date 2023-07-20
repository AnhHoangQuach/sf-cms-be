import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig, InjectAppConfig } from 'src/configs';
import { UsersService } from 'src/modules/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    @InjectAppConfig() config: AppConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    const { sub } = payload;
    const user = await this.userService.findOne({
      username: sub,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
