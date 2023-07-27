import { Injectable, NotFoundException } from '@nestjs/common';
import { JobType } from 'entities';
import { DataSource } from 'typeorm';
import { BaseQueryParams, BaseResultDto, PaginationDto } from 'common';
import { plainToInstance } from 'class-transformer';
import { JobTypeDto } from 'dtos';
import { CreateJobTypeDto } from './dto';

@Injectable()
export class JobTypeService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchJobTypes(
    payload: BaseQueryParams,
  ): Promise<BaseResultDto<PaginationDto<JobTypeDto>>> {
    const { search, page, size, orderBy, desc } = payload;

    const baseQuery = this.dataSource
      .getRepository(JobType)
      .createQueryBuilder('job-type')
      .where('job-type.isActive = true');

    if (search) {
      baseQuery.andWhere('job-type.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (orderBy) {
      baseQuery.orderBy(`job-type.${orderBy}`, desc ? 'DESC' : 'ASC');
    }

    const total = await baseQuery.getCount();

    const banners = await baseQuery
      .skip(size * (page - 1))
      .take(size)
      .getMany();

    return new BaseResultDto<PaginationDto<JobTypeDto>>(
      new PaginationDto<JobTypeDto>(
        plainToInstance(JobTypeDto, banners),
        total,
        page,
        size,
      ),
      true,
    );
  }

  async getJobType(id: number): Promise<BaseResultDto<any>> {
    const result = new BaseResultDto<any>();

    const jobType = await this.dataSource
      .getRepository(JobType)
      .findOne({ where: { id }, relations: ['jobs'] });

    if (!jobType) throw new NotFoundException('Job type not found');

    result.data = jobType;
    result.success = true;

    return result;
  }

  async createJobType(
    payload: CreateJobTypeDto,
  ): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    await this.dataSource.getRepository(JobType).insert(payload);
    result.success = true;

    return result;
  }

  async deleteJobType(id: number): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    const jobType = await this.dataSource
      .getRepository(JobType)
      .findOne({ where: { id } });

    if (!jobType) throw new NotFoundException('Banner not found');

    await this.dataSource.getRepository(JobType).delete(jobType.id);

    result.success = true;

    return result;
  }
}
