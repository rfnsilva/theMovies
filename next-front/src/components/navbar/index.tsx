import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Container } from './styles';

export default function NavBar() {
  const router = useRouter();
  return (
    <Container>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

          <li className="nav-item active">
              <Link href={`/`}>
                <a>Home</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={`/todos/${1}`}>
                <a>Filmes</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={`/todos/${2}`}>
                <a>TV</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={`/`}>
                <a>Series</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

    </Container>
  );
}
