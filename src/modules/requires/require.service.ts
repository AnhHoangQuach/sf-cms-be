import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseQueryParams, BaseResultDto, PaginationDto } from 'common';
import { RequireDto } from 'dtos';
import { Require } from 'entities';
import { DataSource } from 'typeorm';
import { CreateRequireDto } from './dto';

@Injectable()
export class RequireService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchRequires(
    payload: BaseQueryParams,
  ): Promise<BaseResultDto<PaginationDto<RequireDto>>> {
    const { page, size } = payload;
    const total = await this.dataSource.getRepository(Require).count();
    const requires = await this.dataSource.getRepository(Require).find({
      skip: (page - 1) * size,
      take: size,
    });

    const dtos = new PaginationDto<RequireDto>(
      plainToInstance(RequireDto, requires, { excludeExtraneousValues: true }),
      total,
      page,
      size,
    );

    return new BaseResultDto<PaginationDto<RequireDto>>(dtos, true);
  }

  async createRequire(
    payload: CreateRequireDto,
  ): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    await this.dataSource.getRepository(Require).insert(payload);
    result.success = true;

    return result;
  }
}
