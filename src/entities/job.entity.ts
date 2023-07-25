import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobType } from './job-type.entity';
import { JobApply } from './job-apply.entity';
import slugify from 'slugify';
import { generateString } from 'utils';

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

  @Column({ type: 'timestamptz', nullable: true })
  expireDate: Date;

  @ManyToMany(() => JobType, (jobType) => jobType.jobs, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  jobTypes: JobType[];

  @OneToMany(() => JobApply, (jobApply) => jobApply.job)
  jobApplies: JobApply[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true }) + '-' + generateString(6);
  }
}
