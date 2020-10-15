import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoService from './repo.service';

import User from '../db/models/User.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {

}

//modulo que exporta os repositorios
export default RepoModule;