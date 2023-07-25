import { Injectable, NotFoundException } from '@nestjs/common';
import { Banner } from 'entities';
import { DataSource } from 'typeorm';
import { BaseResultDto, PaginationDto } from 'common';
import { plainToInstance } from 'class-transformer';
import { BannerDto } from 'dtos';
import { CreateBannerDto, FetchBannersDto } from './dto';

@Injectable()
export class BannerService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchBanners(
    payload: FetchBannersDto,
  ): Promise<BaseResultDto<PaginationDto<BannerDto>>> {
    const { type, search, page, size, orderBy, desc } = payload;

    const baseQuery = this.dataSource
      .getRepository(Banner)
      .createQueryBuilder('banner')
      .where('banner.isActive = true');

    if (search) {
      baseQuery.andWhere('banner.name LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (type) {
      baseQuery.andWhere('banner.type=:type', {
        type: type.toUpperCase(),
      });
    }
    if (orderBy) {
      baseQuery.orderBy(`banner.${orderBy}`, desc ? 'DESC' : 'ASC');
    }
    const total = await baseQuery.getCount();

    const banners = await baseQuery
      .skip(size * (page - 1))
      .take(size)
      .getMany();

    return new BaseResultDto<PaginationDto<BannerDto>>(
      new PaginationDto<BannerDto>(
        plainToInstance(BannerDto, banners),
        total,
        page,
        size,
      ),
      true,
    );
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
