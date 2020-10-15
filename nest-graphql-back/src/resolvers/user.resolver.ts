import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';

import User from '../db/models/User.entity';
import UserInput, { UserDeleteInput, UserUpdateFavoriteInput } from './inputs/user.input';

//import { context } from 'src/db/loaders'; //dataloader

@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os testes
  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  //retorna um teste
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  //adiciona um teste
  @Mutation(() => User)
  public async createUser(
    @Args('data') input: UserInput,
  ): Promise<User> {
    const user = this.repoService.userRepo.create({
      name: input.name,
      email: input.email,
      password: input.password,
    })
    
    return await this.repoService.userRepo.save(user);
  }

  //adiciona um favorito
  @Mutation(() => [User])
  public async updateFavorite(
    @Args('data') input: UserUpdateFavoriteInput,
  ): Promise<User[]> {
      const aux = await this.repoService.userRepo.query(`
        select * from "user_favoritos_favorito" where user_id='${input.user_id}'
      `);

      console.log(aux)
      console.log(aux.length)

      for (let i = 0; i < aux.length; i++){
          if ((input.user_id === aux[i].user_id) && (input.favorito_id === aux[i].favorito_id)) {
              return aux;
          }
      }
  
      const user_update = await this.repoService.userRepo.query(`
          INSERT INTO "user_favoritos_favorito"("user_id", "favorito_id") VALUES ('${input.user_id}', '${input.favorito_id}')  RETURNING "user_id", "favorito_id"
      `);
      console.log(user_update)

    return user_update;
    /*await this.repoService.userRepo.update(input.id, {...input});

    return this.repoService.userRepo.find({order: {id: 'ASC'}});*/

  }

  //deleta um teste pelo id
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