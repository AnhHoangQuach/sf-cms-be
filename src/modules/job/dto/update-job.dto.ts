import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDto } from './create-job.dto';

export class UpdateBankDto extends PartialType(CreateBankDto) {}
