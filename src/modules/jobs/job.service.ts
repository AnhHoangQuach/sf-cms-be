import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, JobType } from 'entities';
import { DataSource, In } from 'typeorm';
import { BaseQueryParams, BaseResultDto, PaginationDto } from 'common';
import { plainToInstance } from 'class-transformer';
import { JobDto } from 'dtos';
import { CreateJobDto } from './dto';

@Injectable()
export class JobService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchJobs(
    payload: BaseQueryParams,
  ): Promise<BaseResultDto<PaginationDto<JobDto>>> {
    const { page, size } = payload;
    const total = await this.dataSource.getRepository(Job).count();
    const jobs = await this.dataSource.getRepository(Job).find({
      skip: (page - 1) * size,
      take: size,
    });

    const dtos = new PaginationDto<JobDto>(
      plainToInstance(JobDto, jobs, { excludeExtraneousValues: true }),
      total,
      page,
      size,
    );

    return new BaseResultDto<PaginationDto<JobDto>>(dtos, true);
  }

  async getJob(id: number): Promise<BaseResultDto<any>> {
    const result = new BaseResultDto<any>();

    const job = await this.dataSource
      .getRepository(Job)
      .findOne({ where: { id }, relations: ['jobTypes'] });

    if (!job) throw new NotFoundException('Job not found');

    result.data = job;
    result.success = true;

    return result;
  }

  async createJob(payload: CreateJobDto): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    const { jobTypeIds } = payload;

    const jobTypes = await this.dataSource.getRepository(JobType).find({
      where: {
        id: In(jobTypeIds),
      },
    });

    for (const jobTypeId of jobTypeIds) {
      if (!jobTypes.some((jobType) => jobType.id === jobTypeId)) {
        throw new NotFoundException('Job type not found');
      }
    }

    const job = new Job();

    job.name = payload.name;
    job.company = payload.company;
    job.description = payload.description;
    job.experience = payload.experience;
    job.requirement = payload.requirement;
    job.salaryMin = payload.salaryMin;
    job.salaryMax = payload.salaryMax;
    job.welfare = payload.welfare;
    job.expireDate = payload.expireDate;
    job.jobTypes = jobTypes;

    await this.dataSource.getRepository(Job).save(job);

    result.success = true;

    return result;
  }
}
