import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty()
  @Transform(({ value }) => {
    return value.trim().replaceAll(' ', '').toLowerCase();
  })
  username: string;

  @ApiProperty()
  password: string;
}
