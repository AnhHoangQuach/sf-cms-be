import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Introduce } from 'entities';
import { IntroduceController } from './introduce.controller';
import { IntroduceService } from './introduce.service';

@Module({
  imports: [TypeOrmModule.forFeature([Introduce])],
  controllers: [IntroduceController],
  providers: [IntroduceService],
})
export class IntroduceModule {}
