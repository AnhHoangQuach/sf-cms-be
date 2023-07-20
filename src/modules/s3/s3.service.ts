import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as shortid from 'shortid';
import { AppConfig, InjectAppConfig } from 'src/configs';
import { BaseResult } from 'src/dtos';

@Injectable()
export class S3Service {
  constructor(
    @InjectAppConfig() private appConfiguration: AppConfig,
  ) { }

  private getS3(): S3Client {
    return new S3Client({
      endpoint: this.appConfiguration.aws.s3BaseUrl,
      region: this.appConfiguration.aws.s3Region,
      credentials: {
        accessKeyId: this.appConfiguration.aws.s3AccessKeyId,
        secretAccessKey: this.appConfiguration.aws.s3SecretAccessKey,
      },
    });
  }

  private async uploadS3(
    file: Express.Multer.File,
    bucket: string,
  ): Promise<string> {
    const s3BaseUrl = this.appConfiguration.aws.s3BaseUrl;
    const fileName =
      Date.now() + shortid.generate() + path.parse(file.originalname).ext;
    const s3 = this.getS3();
    const params = {
      Bucket: this.appConfiguration.aws.s3Bucket,
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };
    const s3Res = await s3.send(new PutObjectCommand(params));

    const linkFile =
      s3Res && s3Res.ETag ? s3BaseUrl + `/${bucket}/` + fileName : null;
    return linkFile;
  }
  async upload(file: Express.Multer.File): Promise<BaseResult<string>> {
    const linkFile = await this.uploadS3(
      file,
      this.appConfiguration.aws.s3Bucket,
    );
    return new BaseResult(linkFile);
  }
}
