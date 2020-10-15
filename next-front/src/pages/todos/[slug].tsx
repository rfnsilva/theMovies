import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
//import { useRouter } from 'next/router';
import Head from 'next/head'
//import useSWR from 'swr'

import { Container } from '../../styles/pages/Search';
import Input from '../../components/input'
import NavBar from '../../components/navbar'
import Todos from '../../components/todos'

interface Filmes {
  page: number
  results: object[]
  total_pages: number
  total_results: number
}

//const router = useRouter();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;
  let response: any;
  // 1 = filmes
  // 2 = series
  // 3 = tv - incompleto

  switch(slug) {
    case '1':
      response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=1`);
      break;
    case '2':
      response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=1`);
      break;
    case '3':
      response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=1`);
      break;
  }

  const data: Filmes = await response.json();

  return { props: { data } }
}

export default function Slug({ data }){
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>

      <NavBar />

      <Input />

      <Todos data={data} />

    </Container>
  )
}
