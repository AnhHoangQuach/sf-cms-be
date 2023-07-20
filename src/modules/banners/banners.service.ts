import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/commons';
import { Banner, BannerDocument } from './entities/banner.entity';

@Injectable()
export class BannersService extends BaseService<BannerDocument> {
  constructor(
    @InjectModel(Banner.name)
    private model: Model<BannerDocument>,
  ) {
    super(model);
  }
}
