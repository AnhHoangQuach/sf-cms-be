import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobType } from './job-type.entity';

@Entity()
export class Job extends BaseEntity {
  @Column()
  name: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 0 })
  salaryMin: number;

  @Column({ default: 0 })
  salaryMax: number;

  @Column()
  slug: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => JobType, (jobType) => jobType.jobs, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  jobTypes: JobType[];
}
