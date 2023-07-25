import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseQueryParams } from 'common';
import { CreateRequireDto } from './dto';
import { RequireService } from './require.service';

@ApiTags('requires')
@Controller('requires')
export class RequireController {
  constructor(private readonly requireService: RequireService) {}

  private readonly logger = new Logger(RequireService.name);

  @Get('')
  fetchRequires(@Query() params: BaseQueryParams) {
    return this.requireService.fetchRequires(params);
  }

  @Post('')
  createRequire(@Body() body: CreateRequireDto) {
    return this.requireService.createRequire(body);
  }
}
