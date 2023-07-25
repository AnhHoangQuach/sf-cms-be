import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IntroduceType } from 'enums';

export class CreateIntroduceDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsEnum(IntroduceType)
  type: IntroduceType;
}
