import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseResultDto } from 'common';
import { AuthUser } from 'decorators/auth-user.decorator';
import { Roles } from 'decorators/roles.decorator';
import { UserDto } from 'dtos';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserService.name);

  @Roles()
  @Get('me')
  getMe(@AuthUser() user: UserDto) {
    return new BaseResultDto(
      plainToClass(UserDto, user, { excludeExtraneousValues: true }),
    );
  }
}
