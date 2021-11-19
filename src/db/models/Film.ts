import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FilmFormat } from '@constants/index';
import { Actor } from '@components/film/interfaces';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column()
  year!: number;

  @Column({ type: 'enum', enum: FilmFormat })
  formatOfMovie!: FilmFormat;

  @Column({ type: 'jsonb', array: false })
  listOfActors!: Array<Actor>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
