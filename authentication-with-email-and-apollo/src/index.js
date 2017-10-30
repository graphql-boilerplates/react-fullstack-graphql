import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'

import 'tachyons'

// uri: '__SIMPLE_API_ENDPOINT__'
const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9epcu3g5e8x0140t31jj961' })
const middlewareLink = setContext(() => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem('graphcoolToken')}` || null,
  }
}))
const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='create' component={CreatePost} />
      <Route path='login' component={LoginUser} />
      <Route path='signup' component={CreateUser} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
