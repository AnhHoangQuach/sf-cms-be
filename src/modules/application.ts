import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { BannersModule } from './banners';
import { S3Module } from './s3/s3.module';
import { SystemsModule } from './systems';
import { UsersModule } from './users';

mongoose.set('debug', true);

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BannersModule,
    SystemsModule,
    S3Module,
  ],
})
export class ApplicationModule { }
