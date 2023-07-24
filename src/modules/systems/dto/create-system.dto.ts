import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSystemDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  underMaintenance: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  maintenanceMessage: string;
}
