import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Job } from './job.entity';

@Entity()
export class JobApply extends BaseEntity {
  @Column({ nullable: true })
  jobId: number;

  @ManyToOne(() => Job, (job) => job.jobApplies, {
    orphanedRowAction: 'nullify',
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  cv: string;

  @Column()
  introduce: string;
}
