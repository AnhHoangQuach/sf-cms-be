import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BannerType } from 'enums';

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

  @Column({
    type: 'enum',
    enum: BannerType,
    default: BannerType.HOME,
  })
  type: BannerType;
}
