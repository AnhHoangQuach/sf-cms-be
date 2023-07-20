import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  bankName: string;

  @ApiProperty()
  bankUserName: string;

  @ApiProperty()
  bankUserNumber: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isVip: boolean;

  @ApiProperty()
  balance: number;

  // isHasPasswordWithdraw: boolean;
}
