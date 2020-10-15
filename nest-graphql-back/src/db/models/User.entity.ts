import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';

import Favorito from './Favorito.entity'

@ObjectType()
@Entity({ name: 'user' })
export default class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;


  // Associação

  @ManyToMany(() => Favorito, { lazy: true, nullable: true })
  @JoinTable({
      name: 'user_favoritos_favorito',
      joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'favorito_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Favorito])
  favoritos: Promise<Favorito[]>;
}