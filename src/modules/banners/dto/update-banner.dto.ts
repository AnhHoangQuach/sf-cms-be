import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateBannerDto } from './create-banner.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;
}
