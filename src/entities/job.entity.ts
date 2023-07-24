import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobType } from './job-type.entity';
import { JobApply } from './job-apply.entity';

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

  @Column({ nullable: true })
  experience: string;

  @Column()
  welfare: string;

  @Column()
  requirement: string;

  @ManyToMany(() => JobType, (jobType) => jobType.jobs, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  jobTypes: JobType[];

  @OneToMany(() => JobApply, (jobApply) => jobApply.job)
  jobApplies: JobApply[];
}
