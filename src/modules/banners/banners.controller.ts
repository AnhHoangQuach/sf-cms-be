import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BaseQueryParams, BaseResult } from 'src/dtos';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/commons';
import { Role } from 'src/enum';

@ApiTags('banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createBannerDto: CreateBannerDto) {
    const item = await this.bannersService.create(createBannerDto);
    return new BaseResult(item.toJSON());
  }

  @Get()
  findAll(@Query() query: BaseQueryParams) {
    return this.bannersService.findAll(query.filter());
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    const item = await this.bannersService.update(id, updateBannerDto);
    return new BaseResult(item.toJSON());
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const item = await this.bannersService.remove(id);
    return new BaseResult(item);
  }
}
