import React, { useEffect, useState } from 'react';

import { Container } from './styles';
import Card from '../card';

interface Filmes {
  page: number
  results: object[]
  total_pages: number
  total_results: number
}

export default function MainSearch({ data, slug }){
  const [ filmes, setFilmes ] = useState(data.results);
  const [ page, setPage ] = useState<number>(1);

  useEffect(() => {
    setFilmes(data.results)
  }, [data])

  //paginacao
  async function Pagination({ target }) {
    try{
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&query=${slug}&page=${+target.value}&include_adult=false`);
      const data: Filmes = await response.json();

      setPage(+target.value)
      setFilmes(data.results)

    } catch(error){
      console.log(error)
    }
  };

  return (
    <Container>
      <Card filmes={ filmes } />

      <nav aria-label="paginacao">
        <ul>
          <li className="page-item">
            <button onClick={Pagination} value={page - 1} type="submit" className="page-link">Anterior</button>
          </li>
          <li className="page-item">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item">
            <button onClick={Pagination} value={page + 1} type="submit" className="page-link">Próximo</button>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
