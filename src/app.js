import React from 'react'
import { render } from 'react-dom'
import TodoApp from './components/TodoApp'

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { registerGqlTag } from 'apollo-client/gql';
import { ApolloProvider } from 'react-apollo';

import './style.css'

// Globally register gql template literal tag
registerGqlTag();

const networkInterface = createNetworkInterface('https://api.graph.cool/simple/v1/UHJvamVjdDpjaW53NHM0dDcwMmZwMDFtdDIxbHU1ZTh0');

const client = new ApolloClient({
  networkInterface,
});


render(
  <ApolloProvider client={client}>
    <TodoApp />
  </ApolloProvider>,
  document.getElementById('root')
)
