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

    </Container>
  );
}
