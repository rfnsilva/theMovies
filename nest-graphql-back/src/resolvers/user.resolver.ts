import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../db/models/User.entity';
import UserInput, { loginInput, UserDeleteInput, UserUpdateFavoriteInput, MovieUpdateFavoriteInput } from './inputs/user.input';
import { query } from 'express';

//import { context } from 'src/db/loaders'; //dataloader


@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

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
  @Query(() => User)
  public async loginUser(
    @Args('data') input: loginInput,
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

      const favorito = this.repoService.favRepo.create({
        id: inputFav.id,
        title: inputFav.title,
        popularity: inputFav.popularity,
        vote_count: inputFav.vote_count,
        poster_path: inputFav.poster_path,
        backdrop_path: inputFav.backdrop_path,
        original_language: inputFav.original_language,
        original_title: inputFav.original_title,
        overview: inputFav.overview,
        vote_average: inputFav.vote_average,
        adult: inputFav.adult,
        video: inputFav.video,
        release_date: inputFav.release_date,
      })
      
      const fav_criado = await this.repoService.favRepo.save(favorito);
    
      const user_update = await this.repoService.userRepo.query(`
          INSERT INTO "user_favoritos_favorito"("user_id", "favorito_id") VALUES ('${input.user_id}', '${fav_criado.id}')  RETURNING "user_id", "favorito_id"
      `);

    return this.repoService.userRepo.findOne(input.user_id);

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