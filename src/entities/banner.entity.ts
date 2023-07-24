import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Banner extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ default: 0 })
  index: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  image: string;
}
