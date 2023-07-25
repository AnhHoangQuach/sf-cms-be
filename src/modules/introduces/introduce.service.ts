import { Injectable } from '@nestjs/common';
import { Introduce } from 'entities';
import { DataSource } from 'typeorm';
import { BaseResultDto, PaginationDto } from 'common';
import { plainToInstance } from 'class-transformer';
import { IntroduceDto } from 'dtos';
import { CreateIntroduceDto, FetchIntroducesDto } from './dto';

@Injectable()
export class IntroduceService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchIntroduces(
    payload: FetchIntroducesDto,
  ): Promise<BaseResultDto<PaginationDto<IntroduceDto>>> {
    const { type, search, page, size, orderBy, desc } = payload;

    const baseQuery = this.dataSource
      .getRepository(Introduce)
      .createQueryBuilder('introduce')
      .where('introduce.isActive = true');

    if (search) {
      baseQuery.andWhere('introduce.name LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (type) {
      baseQuery.andWhere('introduce.type=:type', {
        type: type.toUpperCase(),
      });
    }
    if (orderBy) {
      baseQuery.orderBy(`introduce.${orderBy}`, desc ? 'DESC' : 'ASC');
    }
    const total = await baseQuery.getCount();

    const banners = await baseQuery
      .skip(size * (page - 1))
      .take(size)
      .getMany();

    return new BaseResultDto<PaginationDto<IntroduceDto>>(
      new PaginationDto<IntroduceDto>(
        plainToInstance(IntroduceDto, banners),
        total,
        page,
        size,
      ),
      true,
    );
  }

  async createIntroduce(
    payload: CreateIntroduceDto,
  ): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    await this.dataSource.getRepository(Introduce).insert(payload);
    result.success = true;

    return result;
  }
}
