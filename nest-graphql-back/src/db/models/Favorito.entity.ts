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
  @Column({type: "decimal"})
  popularity: number;

  @Field()
  @Column()
  vote_count: number

  @Field()
  @Column()
  poster_path: string

  @Field()
  @Column()
  backdrop_path: string

  @Field()
  @Column()
  original_language: string

  @Field()
  @Column()
  original_title: string

  /*@Field()
  @Column()
  genre_ids: number[]*/

  @Field()
  @Column()
  overview: string

  @Field()
  @Column({type: "decimal"})
  vote_average: number

  @Field()
  @Column()
  adult: boolean

  @Field()
  @Column()
  video: boolean

  @Field()
  @Column()
  release_date: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associação
}