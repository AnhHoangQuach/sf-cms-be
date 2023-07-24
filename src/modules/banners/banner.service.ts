import { Injectable, NotFoundException } from '@nestjs/common';
import { Banner } from 'entities';
import { DataSource } from 'typeorm';
import { BaseQueryParams, BaseResultDto, PaginationDto } from 'common';
import { plainToInstance } from 'class-transformer';
import { BannerDto } from 'dtos';
import { CreateBannerDto } from './dto';

@Injectable()
export class BannerService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchBanners(
    payload: BaseQueryParams,
  ): Promise<BaseResultDto<PaginationDto<BannerDto>>> {
    const { page, size, isActive } = payload;
    const total = await this.dataSource.getRepository(Banner).count();
    const banners = await this.dataSource.getRepository(Banner).find({
      skip: (page - 1) * size,
      take: size,
      where: {
        isActive,
      },
    });

    const dtos = new PaginationDto<BannerDto>(
      plainToInstance(BannerDto, banners, { excludeExtraneousValues: true }),
      total,
      page,
      size,
    );

    return new BaseResultDto<PaginationDto<BannerDto>>(dtos, true);
  }

  async createBanner(
    payload: CreateBannerDto,
  ): Promise<BaseResultDto<BannerDto>> {
    const banner = await this.dataSource.getRepository(Banner).save(payload);
    return new BaseResultDto<BannerDto>(plainToInstance(BannerDto, banner));
  }

  async deleteBanner(id: number): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    const banner = await this.dataSource
      .getRepository(Banner)
      .findOne({ where: { id } });

    if (!banner) throw new NotFoundException('Banner not found');

    await this.dataSource.getRepository(Banner).delete(banner.id);

    result.success = true;

    return result;
  }
}
