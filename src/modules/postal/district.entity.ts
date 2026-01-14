import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('districts')
@Index(['name_en'])
@Index(['name_la'])
@Index(['postal_code'])
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  province_code: string;

  @Column() name_en?: string;
  @Column() name_la?: string;
  @Column() name_th?: string;
  @Column() name_zh?: string;

  @Column()
  postal_code?: string;

  @Column({ default: false })
  is_verified: boolean;
}
