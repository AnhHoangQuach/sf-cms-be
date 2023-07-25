import { Module } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobType } from 'entities';
import { JobTypeController } from './job-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobType])],
  controllers: [JobTypeController],
  providers: [JobTypeService],
})
export class JobTypeModule {}
