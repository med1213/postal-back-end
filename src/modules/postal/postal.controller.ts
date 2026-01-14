// src/postal/postal.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { PostalService } from './postal.service';

@Controller('postal')
export class PostalController {
  constructor(private readonly service: PostalService) {}

  @Get('search')
  async search(@Query('q') q: string) {
    return this.service.search(q || '');
  }
}
