import React, { useState, useContext } from 'react';

import AuthContext from '../../contexts/Auth'

import { CardStyled, Description } from './styles';
import Favotire from '../favorite';

//criar interface para os filmes

export default function Card({ filmes }){
  const { signed } = useContext(AuthContext);


  return (
    <>
      { filmes?.map(filme => (
        <CardStyled key={filme.id} >
          <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} width={200} height={260} />
          <Description>
            <div>
              <h1> { filme.title || filme.original_name} </h1>
              <h2> { filme.release_date || filme.first_air_date} </h2>
            </div>
            <Favotire signed={signed ? true : false} filmeId={filme.id} />
          </Description>

        </CardStyled>
      ))}
    </>
  );
}
