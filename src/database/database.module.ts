import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, appConfigs } from 'configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfigs],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfig) => ({
        type: 'postgres',
        host: configService.postgres.host,
        port: configService.postgres.port,
        username: configService.postgres.username,
        password: configService.postgres.password,
        database: configService.postgres.database,
        entities: configService.postgres.entityPaths,
        synchronize: configService.postgres.synchronize,
        logging: configService.postgres.logging,
      }),
      inject: [appConfigs.KEY],
    }),
  ],
})
export class DatabaseModule {}
