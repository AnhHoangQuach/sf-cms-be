import { Role } from 'enums';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  validatePassword(_password: string) {
    return bcrypt.compareSync(_password, this.password);
  }
}
