import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from './base-dto';
export class SystemDto extends BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  underMaintenance: boolean;

  @ApiProperty()
  @Expose()
  maintenanceMessage: string;
}
