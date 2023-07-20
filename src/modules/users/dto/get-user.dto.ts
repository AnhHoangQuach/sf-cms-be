import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParams } from 'src/dtos';

export class UserQueryDTO extends BaseQueryParams {
  @ApiProperty({ required: false })
  username: string;

  @ApiProperty({ required: false })
  phone: string;

  @ApiProperty({ required: false })
  refCode: string;
}
