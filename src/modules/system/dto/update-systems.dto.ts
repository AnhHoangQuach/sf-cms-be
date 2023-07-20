import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto {
  @ApiProperty()
  teleLink: string;

  @ApiProperty()
  zaloLink: string;

  @ApiProperty()
  qrCode: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  siteUrl: string;
}
