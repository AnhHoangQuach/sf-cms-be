import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Job } from './job.entity';

@Entity()
export class JobType extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Job, (job) => job.jobTypes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  jobs: Job[];
}
