import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  logo: string;

  @Column()
  image: string;

  @Column()
  description: string;
}
