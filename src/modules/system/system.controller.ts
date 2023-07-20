import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SystemsService } from './system.service';
import { CreateSystemDto } from './dto/create-systems.dto';
import { BaseQueryParams, BaseResult } from 'src/dtos';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/commons';
import { Role } from 'src/enum';
import { UpdateSystemDto } from './dto';

@ApiTags('systems')
@Controller('systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createSystemDto: CreateSystemDto) {
    const item = await this.systemsService.create(createSystemDto);
    return new BaseResult(item.toJSON());
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() query: BaseQueryParams) {
    return this.systemsService.findAll(query.filter());
  }

  @Get(':name')
  async getSystem(@Param('name') name: string) {
    const item = await this.systemsService.findOne({ name });
    return new BaseResult(item);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSystemDto) {
    const item = await this.systemsService.update(id, dto);
    return new BaseResult(item.toJSON());
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const item = await this.systemsService.remove(id);
    return new BaseResult(item);
  }
}
