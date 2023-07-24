import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class IntroduceType extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  type: string;
}
