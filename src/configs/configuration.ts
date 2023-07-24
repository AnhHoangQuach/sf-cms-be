import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import entities from 'entities';

export const appConfigs = registerAs('app', () => {
  return {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    postgres: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || null,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_USERNAME || 'postgres',
      entityPaths: entities,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE) || true,
      logging: Boolean(process.env.DB_LOGGING) || true,
    },
    jwt: {
      secret: process.env.JWT_SECRET_KEY || 'secret',
      expiresIn: process.env.JWT_EXPIRATION || '4h',
    },
  };
});

export type AppConfig = ConfigType<typeof appConfigs>;
export const InjectAppConfig = () => Inject(appConfigs.KEY);
