import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job, JobApply } from 'entities';
import { JobApplyController } from './job-apply.controller';
import { JobApplyService } from './job-apply.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobApply, Job])],
  controllers: [JobApplyController],
  providers: [JobApplyService],
})
export class JobApplyModule {}
