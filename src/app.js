import React from 'react'
import { render } from 'react-dom'
import TodoApp from './components/TodoApp'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { registerGqlTag } from 'apollo-client/gql'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import './style.css'

// Globally register gql template literal tag
registerGqlTag()

const networkInterface =
  createNetworkInterface('https://api.graph.cool/simple/v1/__PROJECT_ID__')

const client = new ApolloClient({
  networkInterface,
})

function filter (previousState = 'SHOW_ALL', action) {
  if (action.type === 'SET_FILTER') {
    return action.filter
  }

  return previousState
}

const store = createStore(
  combineReducers({
    filter,
    apollo: client.reducer(),
  }),
  applyMiddleware(client.middleware()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

render(
  <ApolloProvider store={store} client={client}>
    <TodoApp />
  </ApolloProvider>,
  document.getElementById('root')
)
