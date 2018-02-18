import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { getMainDefinition } from 'apollo-utilities'


import FeedPage from './components/FeedPage'
import DraftsPage from './components/DraftsPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import PageNotFound from './components/PageNotFound'
import LogoutPage from './components/LogoutPage'
import { USER_ID, AUTH_TOKEN } from './constant'

import 'tachyons'
import './index.css'

const httpLink = new HttpLink({ uri: 'https://uniserver.now.sh/' })

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    }
  })
  return forward(operation)
})

// Authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `wss://uniserver.now.sh/`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    }
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkAuth,
)

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})




  const ProtectedRoute = ({component: Component, token, ...rest}) => {
      return  token  ? (<Route {...rest} render={matchProps => (<Component {...matchProps} />)} />) : (
      <Redirect to="/login" />
    )
  };


  const UnProtectedRoute = ({component: Component, token, ...rest}) => {
    return  token === null ? (<Redirect to="/" />) : (
  <Route {...rest} render={matchProps => (<Component {...matchProps} />)} />
  )
  };

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <nav className="pa3 pa4-ns">
          <Link
            className="link dim black b f6 f5-ns dib mr3"
            to="/"
            title="Feed"
          >
            Blog
          </Link>
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/"
            title="Feed"
          >
            Feed
          </NavLink>
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/drafts"
            title="Drafts"
          >
            Drafts
          </NavLink>
          <Link
            to="/logout"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
           Logout
          </Link>
          <Link
            to="/create"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            + Create Draft
          </Link>
        </nav>
        <div className="fl w-100 pl4 pr4">
          <Switch>
            <Route exact path="/" component={FeedPage} />
            <ProtectedRoute path="/drafts" component={DraftsPage} />
            <ProtectedRoute path="/create" component={CreatePage} />
            <Route path="/post/:id" component={DetailPage} />
            <UnProtectedRoute path="/login" component={LoginPage}/>
            <UnProtectedRoute path="/signup" component={SignupPage}/>
            <Route path="/logout" component={LogoutPage}/>
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
