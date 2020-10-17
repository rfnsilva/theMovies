import React from 'react'
import { gql } from 'apollo-boost';
import useSWR from 'swr'
import { Cookie } from 'next-cookie';
import Head from 'next/head'

import client from '../services/api'

import { Container } from '../styles/pages/Home';
import Main from '../components/main'
import NavBar from '../components/navbar'
import Input from '../components/input'
import SectionFavorite from '../components/sectionfavorite'
import SectionPopularesTv from '../components/sectionpopulartv'

interface Filmes {
  page: number
  results: object[]
  total_pages: number
  total_results: number
}

const GET_FAVORITES = gql`
  query GetFavorites ($id: String!){
    getFavorites(data: { user_id: $id }){
      id,
      title,
      popularity,
      vote_count,
      overview,
      backdrop_path,
      poster_path,
      release_date
    }
  }
`;

export async function getServerSideProps(ctx) {
  const response_populares_filmes = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=1');
  const data_populares_filmes: Filmes = await response_populares_filmes.json();

  const response_populares_tv = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&page=1');
  const data_populares_tv: Filmes = await response_populares_tv.json();

  const { cookie } = new Cookie(ctx);

  const userCookie = cookie.get('user') ? cookie.get('user') : '';

  let data_favoritos: object[];

  if(userCookie){
    const { data } = await client.query({
      variables: { id: "50259de7-5eb4-4182-994f-36c185153213" },
      query: GET_FAVORITES,
    })

    data_favoritos = data;
  }

  console.log(data_populares_filmes.results.length)
  for(let i = 0; i < data_populares_filmes.results.length; i++){
    console.log(data_populares_filmes.results[i].id)
  }

  console.log(data_favoritos)

  return { props: { data_populares_tv, data_populares_filmes, data_favoritos } }
}

export default function Home({ data_populares_tv, data_populares_filmes, data_favoritos }){
  //const { loading, data } = useQuery(EXCHANGE_RATES);
  console.log(data_favoritos)

  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>

      <NavBar />

      <Input />

      <Main data={ data_populares_filmes } />
      <SectionPopularesTv data={ data_populares_tv } />
      <SectionFavorite data={ data_favoritos }/>

    </Container>
  )
}
