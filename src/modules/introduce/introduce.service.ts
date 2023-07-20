import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/commons';
import { Bank, BankDocument } from './entities';

@Injectable()
export class BankService extends BaseService<BankDocument> {
  constructor(
    @InjectModel(Bank.name)
    private model: Model<BankDocument>,
  ) {
    super(model);
  }
}
