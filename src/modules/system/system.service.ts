import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/commons';
import { System, SystemDocument } from './entities/systems.entity';

@Injectable()
export class SystemsService extends BaseService<SystemDocument> {
  constructor(
    @InjectModel(System.name)
    private model: Model<SystemDocument>,
  ) {
    super(model);
  }
}
