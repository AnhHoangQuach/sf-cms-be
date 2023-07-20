import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDto } from './create-product.dto';

export class UpdateBankDto extends PartialType(CreateBankDto) {}
