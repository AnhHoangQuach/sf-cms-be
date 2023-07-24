import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { FetchBannersParams } from './dto';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  private readonly logger = new Logger(BannerService.name);

  @Get('')
  fetchBanners(@Query() params: FetchBannersParams) {
    return this.bannerService.fetchBanners(params);
  }
}
