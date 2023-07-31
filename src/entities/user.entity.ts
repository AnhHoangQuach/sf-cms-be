import { Role } from 'enums';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';
import { Exclude, plainToClass } from 'class-transformer';
import { UserDto } from 'dtos';

@Entity()
export class User extends BaseEntity {
  toDto(): UserDto {
    return plainToClass(UserDto, this, {
      excludeExtraneousValues: true,
    });
  }

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
