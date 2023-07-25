import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParams } from 'common';
import { BannerType } from 'enums';

export class FetchBannersDto extends BaseQueryParams {
  @ApiProperty({
    enum: BannerType,
    required: false,
  })
  type: BannerType;
}
