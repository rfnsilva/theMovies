import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpService, Injectable } from '@nestjs/common';
import RepoService from '../repositorios/repo.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../db/models/User.entity';
import Favorito from '../db/models/Favorito.entity';
import UserInput, { LoginInput, UserDeleteInput, UserUpdateFavoriteInput, MovieUpdateFavoriteInput } from './inputs/user.input';

//import { context } from 'src/db/loaders'; //dataloader

@Injectable()
@Resolver(() => User)
export default class UserResolver {
  constructor(
    private readonly repoService: RepoService,
    //private readonly httpService: HttpService
  ) {}

  //retorna todos os usuarios
  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  //retorna um usuario
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: string): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  //adiciona um usuario
  @Mutation(() => User)
  public async createUser(
    @Args('data') input: UserInput,
  ): Promise<User> {
    const senhaHash = await bcrypt.hash(input.password, 8);

    const user_create = this.repoService.userRepo.create({
      name: input.name,
      email: input.email,
      password: senhaHash,
    })

    const user_token = jwt.sign({ senhaHash }, process.env.SECRET, {
      expiresIn: '1d'
    });

    let user = await this.repoService.userRepo.save(user_create);

    user.token = user_token;
    
    return user;
  }

  //loga um usuario
  @Mutation(() => User)
  public async loginUser(
    @Args('data') input: LoginInput,
  ): Promise<User | undefined> {
    try {
      let user = await this.repoService.userRepo.findOne({
        where: {
          email: input.email
        } 
      });
      
      if (await bcrypt.compare(input.password, user.password)) {

        const user_token = jwt.sign({ hash: input.password }, process.env.SECRET, {
          expiresIn: '1d'
        });

        user.token = user_token;

        return user;
      } else {
          return undefined;
      }
    } catch(error){
      console.log(error)
    }
  }

  //adiciona um favorito
  @Mutation(() => User)
  public async updateFavorite(
    @Args('data_user') input: UserUpdateFavoriteInput,
    @Args('data_fav') inputFav: MovieUpdateFavoriteInput,
  ): Promise<User> {
    const aux = await this.repoService.userRepo.query(`
      select * from "user_favoritos_favorito" where user_id='${input.user_id}'
    `);

    for (let i = 0; i < aux.length; i++){
        if ((input.user_id === aux[i].user_id) && (inputFav.id === aux[i].favorito_id)) {
            return this.repoService.userRepo.findOne(input.user_id);
        }
    }

    const http = new HttpService()
    const response = await http.get('https://api.themoviedb.org/3/movie/528085?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR').toPromise()
    const data = await response.data;

    const favorito = this.repoService.favRepo.create({
      id: inputFav.id,
      title: data.title,
      popularity: data.popularity,
      vote_count: data.vote_count,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.overview,
      vote_average: data.vote_average,
      adult: data.adult,
      video: data.video,
      release_date: data.release_date,
    })
    
    const fav_criado = await this.repoService.favRepo.save(favorito);
  
    const user_update = await this.repoService.userRepo.query(`
        INSERT INTO "user_favoritos_favorito"("user_id", "favorito_id") VALUES ('${input.user_id}', '${fav_criado.id}')  RETURNING "user_id", "favorito_id"
    `);

    return this.repoService.userRepo.findOne(input.user_id);

  }

  //adiciona um favorito
  @Query(() => [Favorito])
  public async getFavorites(
    @Args('data') input: UserUpdateFavoriteInput,
  ): Promise<Favorito[]> {
    const aux = await this.repoService.userRepo.query(`
      select * from "user_favoritos_favorito" where user_id='${input.user_id}'
    `);

    let string_select: string;

    for(let i = 0; i < aux.length; i++){
      if(i == 0){
        string_select = "'" + aux[i].favorito_id + "',"
      }else{
        if(i < (aux.length - 1)){
          string_select += "'" + aux[i].favorito_id + "',"
        } else {
          string_select += "'" + aux[i].favorito_id + "'"
        }
      }

    }

    const favorites = await this.repoService.userRepo.query(`
      SELECT * FROM public.favorito WHERE id IN (${string_select})
    `);

    return favorites;

  }

  //deleta um usuario pelo id
  @Mutation(() => [User])
  public async deleteUser(
    @Args('data') input: UserDeleteInput,
  ): Promise<User[]> {
    const result = await this.repoService.userRepo.delete(input.id);

    //const teste = await this.repoService.userRepo.find();

    if (result.affected === 0) {
      console.log('erro ao deletar')
      throw new Error('erro ao deletar')
    }

    return this.repoService.userRepo.find({order: {id: 'ASC'}});

  }

}