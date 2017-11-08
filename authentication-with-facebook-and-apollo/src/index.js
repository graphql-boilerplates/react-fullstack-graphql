import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'tachyons'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/__SIMPLE_API_ENDPOINT__' })
const wsLink = new WebSocketLink({
	uri: 'wss://subscriptions.graph.cool/v1/__SIMPLE_API_ENDPOINT__',
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
const middlewareLink = new ApolloLink((operation, forward) => {
	const token = window.localStorage.getItem('AffiliateGenius:login')
	const authorizationHeader = token ? `Bearer ${token}` : null
	operation.setContext({
		headers: {
			authorization: authorizationHeader
		}
	})
	return forward(operation)
})
const httpLinkWithAuthToken = middlewareLink.concat(link)
const client = new ApolloClient({
	link: httpLinkWithAuthToken,
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

ReactDOM.render((
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/create' component={CreatePost} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>

  ),
  document.getElementById('root')
)
