import { Injectable } from '@nestjs/common';
import { Product } from 'entities';
import { DataSource } from 'typeorm';
import { BaseQueryParams, BaseResultDto, PaginationDto } from 'common';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from 'dtos';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchProducts(
    payload: BaseQueryParams,
  ): Promise<BaseResultDto<PaginationDto<ProductDto>>> {
    const { page, size } = payload;
    const total = await this.dataSource.getRepository(Product).count();
    const products = await this.dataSource.getRepository(Product).find({
      skip: (page - 1) * size,
      take: size,
    });

    const dtos = new PaginationDto<ProductDto>(
      plainToInstance(ProductDto, products, { excludeExtraneousValues: true }),
      total,
      page,
      size,
    );

    return new BaseResultDto<PaginationDto<ProductDto>>(dtos, true);
  }

  async createProduct(
    payload: CreateProductDto,
  ): Promise<BaseResultDto<boolean>> {
    const result = new BaseResultDto<boolean>();

    await this.dataSource.getRepository(Product).insert(payload);
    result.success = true;

    return result;
  }
}
