// src/postal/postal.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './district.entity';

@Injectable()
export class PostalService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
  ) {}

  async search(q: string) {
    return this.districtRepo
      .createQueryBuilder('d')
      .where('d.name_en LIKE :q', { q: `%${q}%` })
      .orWhere('d.name_la LIKE :q', { q: `%${q}%` })
      .orWhere('d.name_th LIKE :q', { q: `%${q}%` })
      .orWhere('d.name_zh LIKE :q', { q: `%${q}%` })
      .orWhere('d.postal_code = :code', { code: q })
      .limit(20)
      .getMany();
  }
}
