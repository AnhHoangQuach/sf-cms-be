import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'entities';
import { appConfigs } from 'configs';
import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/users';
import { BannerModule } from 'modules/banners';
import { SystemModule } from 'modules/systems';
import { JobTypeModule } from 'modules/job-types';
import { IntroduceModule } from 'modules/introduces';
import { ProductModule } from 'modules/products';
import { JobModule } from 'modules/jobs';
import { RequireModule } from 'modules/requires';
import { JobApplyModule } from 'modules/job-applies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfigs],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    BannerModule,
    SystemModule,
    JobTypeModule,
    IntroduceModule,
    ProductModule,
    JobModule,
    RequireModule,
    JobApplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
