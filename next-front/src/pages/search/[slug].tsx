import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
//import { useRouter } from 'next/router';
import Head from 'next/head'
//import useSWR from 'swr'

import { Container } from '../../styles/pages/Search';
import MainSearch from '../../components/mainsearch'
import Input from '../../components/input'
import NavBar from '../../components/navbar'
import MenuBar from '../../components/menubar'

interface Filmes {
  page: number
  results: object[]
  total_pages: number
  total_results: number
}

//const router = useRouter();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e2e6c0526e3737f2381684d2fd63d354&language=pt-BR&query=${slug}&page=1&include_adult=false`);
  const data: Filmes = await response.json();

  return { props: { data, slug } }
}

export default function Slug({ data, slug }){
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>

      <NavBar />

      <Input />

      <div>
        <MenuBar data={data.total_results} />
        <MainSearch data={ data } slug={ slug } />
      </div>
    </Container>
  )
}
