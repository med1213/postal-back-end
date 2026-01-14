import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column() name_en: string;
  @Column() name_la: string;
  @Column() name_th: string;
  @Column() name_zh: string;

  @Column()
  postal_code: string;
}
