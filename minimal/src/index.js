import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css';
import App from '../src/components/App';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';


const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

//Apollo Client
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)


