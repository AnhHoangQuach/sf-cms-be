import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IntroduceType } from 'enums';

@Entity()
export class Introduce extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: IntroduceType,
    default: IntroduceType.HOME_FUTURE,
  })
  type: IntroduceType;
}
