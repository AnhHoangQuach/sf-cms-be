import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { BaseQueryParams } from 'common';
import { CreateBannerDto } from './dto';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  private readonly logger = new Logger(BannerService.name);

  @Get('')
  fetchBanners(@Query() params: BaseQueryParams) {
    return this.bannerService.fetchBanners(params);
  }

  @Post('')
  createBanner(@Body() body: CreateBannerDto) {
    return this.bannerService.createBanner(body);
  }
}
