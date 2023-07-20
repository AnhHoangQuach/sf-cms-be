import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { BankService } from './candidate.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Roles } from 'src/commons';
import { Role } from 'src/enum';
import { BaseQueryParams, BaseResult } from 'src/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createBankDto: CreateBankDto) {
    const item = await this.bankService.create(createBankDto);
    return new BaseResult(item.toJSON());
  }

  @Get()
  findAll(@Query() query: BaseQueryParams) {
    return this.bankService.findAll(query.filter());
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    const item = await this.bankService.update(id, updateBankDto);
    return new BaseResult(item.toJSON());
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const item = await this.bankService.remove(id);
    return new BaseResult(item);
  }
}