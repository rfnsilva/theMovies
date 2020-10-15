import { Field, InputType } from '@nestjs/graphql';
import User from '../../db/models/User.entity'

@InputType()
export default class UserInput {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

}

@InputType()
export class UserDeleteInput {
  @Field()
  readonly id: string;
}

@InputType()
export class UserUpdateInput {
  @Field()
  readonly id: string;
  
  @Field()
  readonly name: string;
  
}

interface Favorito {
  idFilme: number;
  title: string;
  popularity: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  vote_average: number;
  adult: boolean;
  video: boolean;
  release_date: string;
}

@InputType()
export class UserUpdateFavoriteInput {
  @Field()
  readonly user_id: string;
  
}

@InputType()
export class loginInput {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}

@InputType()
export class MovieUpdateFavoriteInput {
  @Field()
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly popularity: number;

  @Field()
  readonly vote_count: number;

  @Field()
  readonly poster_path: string;

  @Field()
  readonly backdrop_path: string;

  @Field()
  readonly original_language: string;

  @Field()
  readonly original_title: string;

  @Field()
  readonly overview: string;

  @Field()
  readonly vote_average: number;

  @Field()
  readonly adult: boolean;

  @Field()
  readonly video: boolean;

  @Field()
  readonly release_date: string;
}