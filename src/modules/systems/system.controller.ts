import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'enums';

@ApiTags('systems')
@Controller('systems')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  private readonly logger = new Logger(SystemService.name);

  @Get('')
  getSystem() {
    return this.systemService.getSystem();
  }

  @Roles(Role.ADMIN)
  @Post('')
  createSystem(@Body() payload: CreateSystemDto) {
    return this.systemService.createSystem(payload);
  }
}
