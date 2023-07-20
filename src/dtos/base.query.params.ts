import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Max, Min } from 'class-validator';
import { omit, pick } from 'lodash';

export class BaseQueryParams {
  @ApiProperty({ required: false, nullable: true })
  search: string;

  @ApiProperty({ required: false, nullable: true })
  populate: string;

  @ApiProperty({ required: false, default:1 })
  @Type(() => Number)
  @Min(1)
  page = 1;

  @ApiProperty({ required: false, default:10 })
  @Type(() => Number)
  @Min(1)
  size = 10;

  @ApiProperty({ required: false, nullable: true })
  orderBy: string;

  @ApiProperty({ required: false, nullable: true })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  desc = false;

  @ApiProperty({ required: false, nullable: true })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  isActive = true;

  filter() {
    const options = pick(this, ['orderBy', 'populate', 'size', 'page', 'desc']);
    const filters = omit(this, ['orderBy', 'populate', 'size', 'page', 'desc']);
    return { filters, options };
  }
  // @Type(() => Number)
  // skipIndex = Number(this.size) * Number(this.page - 1);
}
