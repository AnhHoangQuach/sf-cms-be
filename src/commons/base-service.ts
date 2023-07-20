import { Injectable, NotFoundException } from '@nestjs/common';
import { isObject, isString } from 'lodash';
import { FilterQuery, Model } from 'mongoose';
import { BaseResultPagination, PaginationDto } from 'src/dtos';

@Injectable()
export class BaseService<T> {
  constructor(public modelT: Model<T>) { }
  async create(createDto): Promise<T> {
    return this.modelT.create(createDto);
  }
  async find(filters?: FilterQuery<T>, projection?, options?): Promise<T[]> {
    return this.modelT.find(filters, projection, options);
  }
  async count(filters?: FilterQuery<T>): Promise<number> {
    return this.modelT.countDocuments(filters);
  }
  async insertMany(data): Promise<any> {
    return this.modelT.insertMany(data);
  }

  async findOne(filter?: FilterQuery<T> | string): Promise<T> {
    if (isString(filter)) {
      return this.modelT.findById(filter);
    } else if (isObject(filter) && typeof filter !== 'string') {
      return this.modelT.findOne(filter);
    }
    return this.modelT.findOne();
  }

  async update(filter: FilterQuery<T> | any, updateDto): Promise<T> {
    let t;
    if (isString(filter)) {
      t = await this.modelT.findById(filter);
    } else if (isObject(filter) && typeof filter !== 'string') {
      t = await this.modelT.findOne(filter);
    }
    if (!t) {
      throw new NotFoundException('Lỗi cập nhật');
    }
    Object.keys(updateDto).forEach((key) => {
      if (updateDto[key] === null || updateDto[key] === undefined) {
        delete updateDto[key];
      }
    });
    Object.assign(t, updateDto);
    await t.save();
    return t;
  }

  async remove(filter: FilterQuery<T> | any): Promise<boolean> {
    let t;
    if (isString(filter)) {
      t = await this.modelT.findById(filter);
    } else if (isObject(filter) && typeof filter !== 'string') {
      t = await this.modelT.findOne(filter);
    }
    if (!t) {
      throw new NotFoundException('Lỗi xóa do gửi nhầm thông tin');
    }
    t.isActive = false;
    await t.save();
    return t;
  }

  async findAll({ filters, options }: any): Promise<BaseResultPagination<T>> {
    const result = new BaseResultPagination<T>();
    console.log("🚀 ~ file: base-service.ts:71 ~ BaseService<T> ~ findAll ~ options:", options)
    const size =
      options && options.size && parseInt(options.size, 10) > 0
        ? parseInt(options.size, 10)
        : 10;
    const page =
      options && options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;

    const skip = (page - 1) * size;
    const query: FilterQuery<T> = filters || {};
    let sort = '';
    if (options && options.orderBy) {
      const sortingCriteria = [];
      options.orderBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = '-createdAt';
    }


    const docsPromise = this.modelT
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(size);
    if (options && options.populate) {
      if (isString(options.populate)) {
        options.populate.split(',').forEach((populateOption) => {
          docsPromise.populate(
            populateOption
              .split('.')
              .reverse()
              .reduce((a, b) => ({ path: b, populate: a })),
          );
        });
      } else if (isObject(options.populate)) {
        docsPromise.populate(options.populate);
      }
    }
    const total = await this.modelT
      .countDocuments(query)
      .exec();
    const items = await docsPromise.exec();
    result.data = new PaginationDto<T>(items, total, page, size);
    return result;
  }
}
