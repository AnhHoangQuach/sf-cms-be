import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDto } from './create-introduce.dto';

export class UpdateBankDto extends PartialType(CreateBankDto) {}
