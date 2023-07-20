import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, appConfigs } from './configs';
import { ApplicationModule } from './modules/application';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfigs],
    }),
    MongooseModule.forRootAsync({
      inject: [appConfigs.KEY],
      useFactory: (config: AppConfig) => {
        return {
          uri: config.mongodb.uri,
          dbName: config.mongodb.dbName,
        };
      },
    }),
    ApplicationModule,
  ],
})
export class AppModule {}
