import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException, UnauthorizedException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let errors: any;
    if (exception['response'].message) {
      if (Array.isArray(exception['response'].message)) {
        errors = exception['response'].message.map((error: ValidationError) => {
          return {
            field: error.property,
            message: Object.values(error.constraints)[0],
          };
        });
      } else {
        errors = [
          {
            message: exception['response'].message,
          },
        ];
      }
    } else {
      errors = [
        {
          message: exception['response'],
        },
      ];
    }
    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().getTime(),
      errors,
    });
  }
}
