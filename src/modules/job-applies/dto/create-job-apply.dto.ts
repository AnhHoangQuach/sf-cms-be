import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateJobApplyDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  cv: string;

  @ApiProperty()
  @IsString()
  introduce: string;

  @ApiProperty()
  @IsNumber()
  jobId: number;
}
