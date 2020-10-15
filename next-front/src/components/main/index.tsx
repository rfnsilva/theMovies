import React, { useState } from 'react';

import { Container } from './styles';
import Card from '../card';

interface Filmes {
  page: number
  results: object[]
  total_pages: number
  total_results: number
}

export default function Main({ data }){
  const [ filmes, setFilmes ] = useState(data.results);
  const [ page, setPage ] = useState<number>(1);

  //paginacao
  async function Pagination({ target }) {
    /*try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=${+target.value}`);
      const data: Filmes = await response.json();

      setPage(+target.value)
      setFilmes(data.results)

    } catch(error){
      console.log(error)
    }*/
  };

  return (
    <Container>
      <div className="header_section">
        <h2>Os Mais Populares</h2>
        <div className="selector_wrap">
          <div className="selector">

            <div className="anchor selected">
              <h3><a href="#" className="no_click" data-panel="popular_scroller" data-group="streaming">Streaming <span className="glyphicons_v2 chevron-down"></span></a></h3>
              <div className="background"></div>
            </div>

            <div className="anchor ">
              <h3><a href="#" className="no_click" data-panel="popular_scroller" data-group="on-tv">Na TV <span className="glyphicons_v2 chevron-down"></span></a></h3>
              <div className="background hide"></div>
            </div>

            <div className="anchor ">
              <h3><a href="#" className="no_click" data-panel="popular_scroller" data-group="for-rent">Para Alugar <span className="glyphicons_v2 chevron-down"></span></a></h3>
            </div>

            <div className="anchor">
              <h3><a href="#" className="no_click" data-panel="popular_scroller" data-group="in-theatres">Nos Cinemas <span className="glyphicons_v2 chevron-down"></span></a></h3>
            </div>

          </div>
        </div>
      </div>

      <section>
        <Card filmes={ filmes } />
      </section>

      {/* <nav aria-label="paginacao">
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
      </nav> */}
    </Container>
  );
}
