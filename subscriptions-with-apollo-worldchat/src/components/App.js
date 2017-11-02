import React, { Component } from 'react'
import WorldChat from './WorldChat'
import generateStupidName from 'sillyname'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// Paste your own service ID here
const serviceId = ``

const httpLink = createHttpLink({ uri: `https://api.graph.cool/simple/v1/${serviceId}` })

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/${serviceId}`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

const WORLDCHAT_USERNAME_KEY = 'WORLDCHAT_USERNAME'

class App extends Component {

  componentWillMount() {
    let name = localStorage.getItem(WORLDCHAT_USERNAME_KEY)
    if (!name) {
      name = generateStupidName()
      console.log('No name in localStorage, generated new: ', name)
      localStorage.setItem(WORLDCHAT_USERNAME_KEY, name)
    }
    console.log('Name in localStorage: ', name)
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <WorldChat
          name={localStorage.getItem(WORLDCHAT_USERNAME_KEY)}
        />
      </ApolloProvider>
    )
  }
}

export default App
