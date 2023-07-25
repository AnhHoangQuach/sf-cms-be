import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParams } from 'common';
import { IntroduceType } from 'enums';

export class FetchIntroducesDto extends BaseQueryParams {
  @ApiProperty({
    enum: IntroduceType,
    required: false,
  })
  type: IntroduceType;
}
