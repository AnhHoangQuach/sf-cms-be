import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';

@ApiTags('systems')
@Controller('systems')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  private readonly logger = new Logger(SystemService.name);

  @Get('')
  getSystem() {
    return this.systemService.getSystem();
  }
}
