import React from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components'

import client from '../services/api'

import GlobalStyles from '../styles/global'
import theme from '../styles/theme'

import 'bootstrap/dist/css/bootstrap.min.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default MyApp
