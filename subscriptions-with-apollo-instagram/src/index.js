import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './components/ListPage'
import CreatePage from './components/CreatePage'
import { Router, Route, browserHistory } from 'react-router'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import 'tachyons'
import './index.css'

const wsClient = new SubscriptionClient(process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS_URI, {
  reconnect: true,
  timeout: 20000
})

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHQL_URI
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={ListPage} />
      <Route path='/create' component={CreatePage} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
