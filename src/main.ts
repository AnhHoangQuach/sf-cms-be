import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AppConfig,
  HttpExceptionFilter,
  appConfigs,
  configureSwagger,
} from './configs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {});
    const appConfig = app.get<AppConfig>(appConfigs.KEY);
    app.setGlobalPrefix(appConfig.globalPrefix);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    if (appConfig.env !== 'production') configureSwagger(app);
    const server = await app.listen(appConfig.port);
    console.log(`service is running on: ${await app.getUrl()}/docs`);
    server.setTimeout(1800000);
  } catch (error) {
    console.log('🚀 ~ file: main.ts:24 ~ bootstrap ~ error:', error);
  }
}
bootstrap();
