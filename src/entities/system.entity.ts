import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class System extends BaseEntity {
  @Column({ default: false })
  underMaintenance: boolean;

  @Column({
    default: 'System is under maintenance. Please try again later.',
  })
  maintenanceMessage: string;
}
