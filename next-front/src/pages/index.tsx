import React, { useState } from 'react'
import useSWR from 'swr'
import { Cookie } from 'next-cookie';
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { Container } from '../styles/pages/Home';
import Main from '../components/main'
import NavBar from '../components/navbar'
import Input from '../components/input'
import SectionPopularesTv from '../components/sectionpopulartv'

interface Filmes {
  page: number
  results: object[]
  total_pages: number
  total_results: number
}

export async function getServerSideProps(ctx) {
  const response_populares_filmes = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=1');
  const data_populares_filmes: Filmes = await response_populares_filmes.json();

  const response_populares_tv = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=1');
  const data_populares_tv: Filmes = await response_populares_tv.json();

  const { cookie } = new Cookie(ctx);

  const userCookie = cookie.get('user') ? cookie.get('user') : '';

  /*if(!userCookie){
    ctx.res.setHeader("location", "/");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }*/

  return { props: { data_populares_tv, data_populares_filmes, userCookie } }
}

export default function Home({ data_populares_tv, data_populares_filmes, userCookie }){
  //const { loading, data } = useQuery(EXCHANGE_RATES);

  console.log(userCookie)

  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>

      <NavBar />

      <Input />

      <Main data={ data_populares_filmes } />
      <SectionPopularesTv data={ data_populares_tv } />

    </Container>
  )
}
