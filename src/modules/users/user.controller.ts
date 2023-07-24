import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
}
