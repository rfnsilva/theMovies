import React, { useState } from 'react';

import { Container } from './styles';
import Card from '../card';

export default function SectionFavorite({ data }){
  return (
    <Container>
      <div className="header_section">
        <h2>Seus Favoritos</h2>
        <div className="selector_wrap">
          <div className="selector">

            <div className="anchor selected">
              <h3><a href="#" className="no_click" data-panel="popular_scroller" data-group="streaming">Streaming <span className="glyphicons_v2 chevron-down"></span></a></h3>
              <div className="background"></div>
            </div>

            <div className="anchor ">
              <h3><a href="#" className="no_click" data-panel="popular_scroller" data-group="on-tv">No Cimena <span className="glyphicons_v2 chevron-down"></span></a></h3>
              <div className="background hide"></div>
            </div>

          </div>
        </div>
      </div>

      <section>
        <Card filmes={ data.getFavorites } />
      </section>
    </Container>
  );
}
