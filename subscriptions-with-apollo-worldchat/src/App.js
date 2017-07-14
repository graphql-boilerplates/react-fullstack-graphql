import React, { Component } from 'react'
import WorldChat from './WorldChat'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'
import generateStupidName from 'sillyname'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'


// __SUBSCRIPTIONS_API_ENDPOINT__ looks similar to: `wss://subscriptions.graph.cool/v1/<PROJECT_ID>`
const wsClient = new SubscriptionClient('__SUBSCRIPTIONS_API_ENDPOINT__', {
  reconnect: true,
	timeout: 20000
})

// __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})


const WORLDCHAT_USERNAME_KEY = 'WORLDCHAT_USERNAME'

class App extends Component {

  componentWillMount() {

    // testing
    // localStorage.removeItem(WORLDCHAT_USERNAME_KEY)

    let name = localStorage.getItem(WORLDCHAT_USERNAME_KEY)
    if (!Boolean(name)) {
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
