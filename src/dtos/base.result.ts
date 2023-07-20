import { ApiProperty } from '@nestjs/swagger';

export class BaseResult<T> {
  @ApiProperty()
  errors: string;

  @ApiProperty()
  data: T;

  @ApiProperty()
  success = true;
  constructor(_data?: T, _success?: boolean) {
    this.data = _data;
    this.success = _success;
  }
}
