import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from './base-dto';
export class RequireDto extends BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phone: string;

  @ApiProperty()
  @Expose()
  requestedCompletionDate: Date;

  @ApiProperty()
  @Expose()
  quantity: string;

  @ApiProperty()
  @Expose()
  projectName: string;

  @ApiProperty()
  @Expose()
  description: string;
}
