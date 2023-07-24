import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { Role } from 'enums';
import { User } from 'entities';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}
  async onModuleInit() {
    if (process.env.NODE_ENV !== 'production') {
      const defaultAdmin = await this.dataSource
        .getRepository(User)
        .findOneBy({ email: 'admin@gmail.com' });

      if (!defaultAdmin) {
        const user = new User();
        user.email = 'admin@gmail.com';
        user.password = '123456';
        user.role = Role.ADMIN;
        user.isActive = true;

        this.dataSource.getRepository(User).insert(user);
      }
    }
  }
}
