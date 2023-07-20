import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { Role } from 'src/enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private service: UsersService) {}
  async onModuleInit() {
    const existAdmin = await this.service.findOne({ role: Role.ADMIN });
    const existSale = await this.service.findOne({ role: Role.SALE });
    const existXNK = await this.service.findOne({ role: Role.XNK });
    const migrate = [];
    if (!existAdmin)
      migrate.push({
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
        role: Role.ADMIN,
      });
    if (!existSale)
      migrate.push({
        username: 'sale',
        password: bcrypt.hashSync('sale', 10),
        role: Role.SALE,
      });
    if (!existXNK)
      migrate.push({
        username: 'xnk',
        password: bcrypt.hashSync('xnk', 10),
        role: Role.XNK,
      });
    await this.service.insertMany(migrate);
  }
}
