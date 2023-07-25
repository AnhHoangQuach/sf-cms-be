import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Require } from 'entities';
import { RequireController } from './require.controller';
import { RequireService } from './require.service';

@Module({
  imports: [TypeOrmModule.forFeature([Require])],
  controllers: [RequireController],
  providers: [RequireService],
})
export class RequireModule {}
