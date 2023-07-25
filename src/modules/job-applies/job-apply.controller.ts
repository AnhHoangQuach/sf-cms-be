import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseQueryParams } from 'common';
import { CreateJobApplyDto } from './dto';
import { JobApplyService } from './job-apply.service';

@ApiTags('job_applies')
@Controller('job_applies')
export class JobApplyController {
  constructor(private readonly jobApplyService: JobApplyService) {}

  private readonly logger = new Logger(JobApplyService.name);

  @Get('')
  fetchJobApplies(@Query() params: BaseQueryParams) {
    return this.jobApplyService.fetchApplies(params);
  }

  @Post('')
  createJobApply(@Body() body: CreateJobApplyDto) {
    return this.jobApplyService.createJobApply(body);
  }
}
