import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'

import 'tachyons'

const httpLink = createHttpLink({ uri: '__SIMPLE_API_ENDPOINT__' })
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
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/create' component={CreatePost} />
        <Route exact path='/login' component={LoginUser} />
        <Route exact path='/signup' component={CreateUser} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
