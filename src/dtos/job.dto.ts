import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from './base-dto';
import { JobType } from 'entities';
export class JobDto extends BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  company: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  salaryMin: number;

  @ApiProperty()
  @Expose()
  salaryMax: number;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  experience: string;

  @ApiProperty()
  @Expose()
  welfare: string;

  @ApiProperty()
  @Expose()
  requirement: string;

  @ApiProperty()
  @Expose()
  expireDate: Date;

  @ApiProperty({
    type: [JobType],
  })
  @Expose()
  jobTypes: JobType[];
}
