import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/commons';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private model: Model<UserDocument>,
  ) {
    super(model);
  }
}
