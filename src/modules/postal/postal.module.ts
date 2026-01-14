// src/postal/postal.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './district.entity';
import { Province } from './province.entity';
import { PostalController } from './postal.controller';
import { PostalService } from './postal.service';

@Module({
  imports: [TypeOrmModule.forFeature([District, Province])],
  controllers: [PostalController],
  providers: [PostalService],
})
export class PostalModule {}
