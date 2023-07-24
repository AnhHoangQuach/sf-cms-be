import { Module } from '@nestjs/common';
import { BannerService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'entities';
import { BannerController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
