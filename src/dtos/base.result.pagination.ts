import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './base.pagination.data';

export class BaseResultPagination<T> {
  @ApiProperty()
  errors: string;
  @ApiProperty()
  data: PaginationDto<T>;
  @ApiProperty()
  success = true;
  constructor(_data?) {
    this.data = _data;
  }
}
