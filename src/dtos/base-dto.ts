import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
