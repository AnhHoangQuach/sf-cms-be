import { Injectable } from '@nestjs/common';
import { Banner } from 'entities';
import { DataSource } from 'typeorm';
import { BaseResultDto, PaginationDto } from 'common';
import { plainToInstance } from 'class-transformer';
import { BannerDto } from 'dtos';
import { FetchBannersParams } from './dto';

@Injectable()
export class BannerService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchBanners(payload: FetchBannersParams) {
    const { page, size } = payload;
    const total = await this.dataSource.getRepository(Banner).count();
    const banners = await this.dataSource.getRepository(Banner).find({
      skip: (page - 1) * size,
      take: size,
    });

    const dtos = new PaginationDto<BannerDto>(
      plainToInstance(BannerDto, banners, { excludeExtraneousValues: true }),
      total,
      page,
      size,
    );

    return new BaseResultDto<PaginationDto<BannerDto>>(dtos, true);
  }
}
