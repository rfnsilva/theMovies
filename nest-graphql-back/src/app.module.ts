import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import AppService from './app.service';

import * as ormConfig from './config/orm';

import repoModule from './repositorios/repo.module'

import UserResolver from './resolvers/user.resolver';

import { context } from './db/loaders';

const gqlImports = [
  UserResolver,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    repoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      installSubscriptionHandlers: true,
      context,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}