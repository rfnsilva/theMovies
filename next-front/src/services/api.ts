//import ApolloClient from 'apollo-boost';

//export default new ApolloClient({
  //uri: 'http://localhost:3333/graphql',
  // request: (operation) => {
  //   operation.setContext(({ headers = {} }) => ({
  //     headers: {
  //       ...headers,
  //       authorization: `Bearer ${bearerToken}`,
  //     },
  //   }));
  // },
//});

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  ssrMode: true,
  cache: new InMemoryCache()
});

export default client;
