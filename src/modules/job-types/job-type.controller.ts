import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobTypeService } from './job-type.service';
import { BaseQueryParams } from 'common';
import { CreateJobTypeDto } from './dto';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'enums';

@ApiTags('job_types')
@Controller('job_types')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  private readonly logger = new Logger(JobTypeService.name);

  @Get('')
  fetchJobTypes(@Query() params: BaseQueryParams) {
    return this.jobTypeService.fetchJobTypes(params);
  }

  @Get(':id')
  getJob(@Param('id') id: number) {
    return this.jobTypeService.getJobType(id);
  }

  @Roles(Role.ADMIN)
  @Post('')
  createJobType(@Body() body: CreateJobTypeDto) {
    return this.jobTypeService.createJobType(body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteJobType(@Param('id') id: number) {
    return this.jobTypeService.deleteJobType(id);
  }
}
