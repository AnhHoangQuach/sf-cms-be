import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseResultDto } from 'common';
import { SystemDto } from 'dtos/system.dto';
import { plainToInstance } from 'class-transformer';
import { System } from 'entities';

@Injectable()
export class SystemService {
  constructor(private readonly dataSource: DataSource) {}

  async getSystem(): Promise<BaseResultDto<SystemDto>> {
    const system = await this.dataSource.getRepository(System).findOneBy({});

    return new BaseResultDto<SystemDto>(plainToInstance(SystemDto, system));
  }
}
