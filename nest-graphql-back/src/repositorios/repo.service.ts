import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import User from '../db/models/User.entity';
import Favorito from '../db/models/Favorito.entity';

@Injectable()
class RepoService {
  public constructor(

    //serviço que injeta os repositorios no codigo
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Favorito) public readonly favRepo: Repository<Favorito>,
  ){}
}

export default RepoService;