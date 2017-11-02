import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink} from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'

const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cj8u9zl5f09d00157z94mgkq9' })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphcoolToken')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})
const httpLinkWithAuthToken = middlewareLink.concat(httpLink)


const client = new ApolloClient({ 
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/create' component={CreatePost} />
        <Route path='/login' component={LoginUser} />
        <Route path='/signup' component={CreateUser} />
      </div>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
