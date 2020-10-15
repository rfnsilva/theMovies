import React, { useContext } from 'react';

import { Container, Wrapper, Title, Results } from './styles';

export default function MenuBar({ data }) {
  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>Resultado da busca</h1>
        </Title>

        <Results>
          <div>
            <a href="#">Filmes </a><span>{data}</span>
          </div>
          <div>
            <a href="#">Series </a><span></span>
          </div>
          <div>
            <a href="#">Pessoas </a><span></span>
          </div>
          <div>
            <a href="#">Coletânias </a><span></span>
          </div>
          <div>
            <a href="#">Palavras chaves </a><span></span>
          </div>
        </Results>
      </Wrapper>
    </Container>
  );
}
