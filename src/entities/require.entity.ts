import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Require extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column()
  requestedCompletionDate: string;

  @Column({ nullable: true })
  quantity: string;

  @Column({ nullable: true })
  projectName: string;

  @Column({ nullable: true })
  description: string;
}
