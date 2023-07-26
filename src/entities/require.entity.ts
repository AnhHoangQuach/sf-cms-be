import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Require extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  requestedCompletionDate: Date;

  @Column({ default: 0 })
  quantity: number;

  @Column({ nullable: true })
  projectName: string;

  @Column({ nullable: true })
  description: string;
}
