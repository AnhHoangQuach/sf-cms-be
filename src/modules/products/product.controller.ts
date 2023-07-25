import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { BaseQueryParams } from 'common';
import { CreateProductDto } from './dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private readonly logger = new Logger(ProductService.name);

  @Get('')
  fetchProducts(@Query() params: BaseQueryParams) {
    return this.productService.fetchProducts(params);
  }

  @Post('')
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }
}
