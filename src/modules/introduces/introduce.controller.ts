import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateIntroduceDto, FetchIntroducesDto } from './dto';
import { IntroduceService } from './introduce.service';

@ApiTags('introduces')
@Controller('introduces')
export class IntroduceController {
  constructor(private readonly introduceService: IntroduceService) {}

  private readonly logger = new Logger(IntroduceService.name);

  @Get('')
  fetchBanners(@Query() params: FetchIntroducesDto) {
    return this.introduceService.fetchIntroduces(params);
  }

  @Post('')
  createIntroduce(@Body() body: CreateIntroduceDto) {
    return this.introduceService.createIntroduce(body);
  }
}
