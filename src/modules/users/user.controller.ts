import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
  UserQueryDTO,
} from './dto';
import { Roles } from 'src/commons';
import { BaseResult } from 'src/dtos';
import { AuthUser } from 'src/commons';
import { Role } from 'src/enum';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles()
  @Post('change-password')
  async changePassword(@AuthUser() user, @Body() body: ChangePasswordDto) {
    if (!(await user.comparePassword(body.oldPassword))) {
      throw new BadRequestException('Mật khẩu cũ sai');
    }
    const result = await this.usersService.update(user.id, {
      password: body.newPassword,
    });
    return new BaseResult(result.toJSON());
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new BaseResult(user.toJSON());
  }

  @Roles(Role.ADMIN, Role.XNK)
  @Get()
  findAll(@Query() params: UserQueryDTO) {
    return this.usersService.findAll(params.filter());
  }

  @Roles()
  @Get('me')
  me(@AuthUser() user) {
    return new BaseResult(user.toJSON());
  }
  @Roles()
  @Get('balance')
  balance(@AuthUser() user) {
    return new BaseResult({ balance: user.balance });
  }

  @Roles(Role.ADMIN, Role.SALE)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new BaseResult(user.toJSON());
  }

  @Roles(Role.USER)
  @Put()
  async updateProfile(@AuthUser() user, @Body() updateUserDto: UpdateUserDto) {
    if (user.role === Role.USER) {
      delete updateUserDto.isVip;
    }

    if (updateUserDto.password == '') delete updateUserDto.password;
    // if (updateUserDto.passwordWithdraw) {
    //   updateUserDto.isHasPasswordWithdraw = true;
    // }

    const result = await this.usersService.update(user.id, updateUserDto);
    return new BaseResult(result.toJSON());
  }

  @Roles(Role.ADMIN, Role.SALE)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.password == '') delete updateUserDto.password;
    const user = await this.usersService.update(id, updateUserDto);
    return new BaseResult(user.toJSON());
  }

  @Roles(Role.ADMIN, Role.SALE)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return new BaseResult(user);
  }
}
