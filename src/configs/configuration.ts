import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const appConfigs = registerAs('app', () => {
  return {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    mongodb: {
      uri: process.env.MONGODB_URI,
      dbName: process.env.MONGODB_DBNAME,
    },
    jwt: {
      secret: process.env.JWT_SECRET_KEY || '1',
      expiresIn: process.env.JWT_EXPIRES_IN || '4h',
    },
    aws: {
      s3Region: process.env.S3_REGION || 'ap-southeast-1',
      s3Bucket: process.env.S3_BUCKET || 'testnet-assets',
      s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
      s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      s3BaseUrl: process.env.S3_BASE_URL,
    },
  };
});

export type AppConfig = ConfigType<typeof appConfigs>;
export const InjectAppConfig = () => Inject(appConfigs.KEY);
