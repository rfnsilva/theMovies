import { Field, InputType } from '@nestjs/graphql';

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
  readonly id: number;
}

@InputType()
export class UserUpdateInput {
  @Field()
  readonly id: number;
  
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
  
  @Field()
  readonly favorito_id: string;
  
}