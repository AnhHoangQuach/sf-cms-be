import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const hour = new Date().getHours();
    if (hour > 22 && hour < 9)
      throw new BadRequestException('Giờ làm việc từ 9h00 sáng đến 22h00');
    next();
  }
}
