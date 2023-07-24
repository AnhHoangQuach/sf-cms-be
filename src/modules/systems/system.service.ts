import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseResultDto } from 'common';
import { SystemDto } from 'dtos/system.dto';
import { plainToInstance } from 'class-transformer';
import { System } from 'entities';
import { CreateSystemDto } from './dto';

@Injectable()
export class SystemService {
  constructor(private readonly dataSource: DataSource) {}

  async getSystem(): Promise<BaseResultDto<SystemDto>> {
    const system = await this.dataSource.getRepository(System).findOneBy({});

    return new BaseResultDto<SystemDto>(
      plainToInstance(SystemDto, system),
      true,
    );
  }

  async createSystem(
    payload: CreateSystemDto,
  ): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    const system = await this.dataSource.getRepository(System).findOneBy({});

    if (system) {
      await this.dataSource.getRepository(System).update(system.id, payload);
    } else {
      await this.dataSource.getRepository(System).save(payload);
    }

    result.success = true;
    return result;
  }
}
