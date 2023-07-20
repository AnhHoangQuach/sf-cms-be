import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemsController } from './system.controller';
import { SystemsService } from './system.service';
import { System, SystemSchema } from './entities/systems.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: System.name,
        schema: SystemSchema,
      },
    ]),
  ],
  controllers: [SystemsController],
  providers: [SystemsService],
  exports: [SystemsService],
})
export class SystemsModule {}
