import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseQueryParams } from 'common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  private readonly logger = new Logger(JobService.name);

  @Get('')
  fetchJobs(@Query() params: BaseQueryParams) {
    return this.jobService.fetchJobs(params);
  }

  @Post('')
  createJob(@Body() body: CreateJobDto) {
    return this.jobService.createJob(body);
  }
}
