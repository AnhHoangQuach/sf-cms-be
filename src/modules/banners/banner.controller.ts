import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto, FetchBannersDto } from './dto';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'enums';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  private readonly logger = new Logger(BannerService.name);

  @Get('')
  fetchBanners(@Query() params: FetchBannersDto) {
    return this.bannerService.fetchBanners(params);
  }

  @Roles(Role.ADMIN)
  @Post('')
  createBanner(@Body() body: CreateBannerDto) {
    return this.bannerService.createBanner(body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteBanner(@Param('id') id: number) {
    return this.bannerService.deleteBanner(id);
  }
}
