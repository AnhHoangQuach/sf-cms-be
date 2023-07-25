import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseQueryParams, BaseResultDto, PaginationDto } from 'common';
import { JobApplyDto } from 'dtos';
import { Job, JobApply } from 'entities';
import { DataSource } from 'typeorm';
import { CreateJobApplyDto } from './dto';

@Injectable()
export class JobApplyService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchApplies(
    payload: BaseQueryParams,
  ): Promise<BaseResultDto<PaginationDto<JobApplyDto>>> {
    const { page, size } = payload;
    const total = await this.dataSource.getRepository(JobApply).count();
    const jobApplies = await this.dataSource.getRepository(JobApply).find({
      skip: (page - 1) * size,
      take: size,
    });

    const dtos = new PaginationDto<JobApplyDto>(
      plainToInstance(JobApplyDto, jobApplies, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      size,
    );

    return new BaseResultDto<PaginationDto<JobApplyDto>>(dtos, true);
  }

  async createJobApply(
    payload: CreateJobApplyDto,
  ): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    const { jobId } = payload;

    const job = await this.dataSource
      .getRepository(Job)
      .findOneBy({ id: jobId });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const jobApply = await this.dataSource.getRepository(JobApply).findOne({
      where: [
        { jobId, phone: payload.phone },
        { jobId, email: payload.email },
      ],
    });

    if (jobApply) {
      await this.dataSource
        .getRepository(JobApply)
        .update(jobApply.id, payload);
    } else {
      await this.dataSource.getRepository(JobApply).save(payload);
    }

    result.success = true;

    return result;
  }
}
