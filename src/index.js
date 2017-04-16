import React from 'react'
import { render } from 'react-dom'
import TodoApp from './components/TodoApp'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import './style.css'

// Paste your endpoint for the Simple API here.
// Info: https://github.com/graphcool-examples/react-apollo-todo-example#2-create-graphql-api-with-graphcool
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' });

// The x-graphcool-source header is to let the server know that the example app has started.
// (Not necessary for normal projects)
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      // Create the header object if needed.
      req.options.headers = {}
    }
    req.options.headers['x-graphcool-source'] = 'example:react-apollo-todo'
    next()
  },
}])

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
  // initial state
  {},
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

render(
  <ApolloProvider store={store} client={client}>
    <TodoApp />
  </ApolloProvider>,
  document.getElementById('root')
)
