import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class BaseQueryParams {
  @ApiProperty({ required: false, default: 1 })
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiProperty({ required: false, default: 10 })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  size: number;

  @ApiProperty({ required: false, nullable: true, default: 'createdAt' })
  orderBy: string;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  desc: boolean;

  @ApiProperty({
    required: false,
  })
  search: string;

  @ApiProperty({ required: false, nullable: true })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  isActive = true;
}
