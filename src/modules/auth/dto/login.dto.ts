import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty()
  @Transform(({ value }) => {
    return value.trim().replaceAll(' ', '').toLowerCase();
  })
  email: string;

  @ApiProperty()
  password: string;
}
