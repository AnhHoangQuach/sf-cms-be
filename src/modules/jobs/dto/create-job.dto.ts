import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateJobDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  salaryMin: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  salaryMax: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  experience: string;

  @ApiProperty()
  @IsString()
  welfare: string;

  @ApiProperty()
  @IsString()
  requirement: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  jobTypeIds: number[];

  @ApiProperty()
  @IsDateString()
  expireDate: Date;
}
