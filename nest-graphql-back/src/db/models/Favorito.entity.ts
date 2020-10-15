import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'favorito' })
export default class Favorito {
  
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ nullable: true })
  popularity: number;

  @Field()
  @Column({ nullable: true })
  vote_count: number

  @Field()
  @Column({ nullable: true })
  poster_path: string

  @Field()
  @Column({ nullable: true })
  backdrop_path: string

  @Field()
  @Column({ nullable: true })
  original_language: string

  @Field()
  @Column({ nullable: true })
  original_title: string

  /*@Field()
  @Column()
  genre_ids: number[]*/

  @Field()
  @Column({ nullable: true })
  overview: string

  @Field()
  @Column({ nullable: true })
  vote_average: number

  @Field()
  @Column({ nullable: true })
  adult: boolean

  @Field()
  @Column({ nullable: true })
  video: boolean

  @Field()
  @Column({ nullable: true })
  release_date: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associação
}