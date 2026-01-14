// src/postal/dto/search.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  lang?: 'en' | 'la' | 'th' | 'zh';
}
