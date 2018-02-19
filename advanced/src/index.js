import React, {Component} from 'react'
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
  const tokenValue = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : "",
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

  const token = localStorage.getItem (AUTH_TOKEN)

  const ProtectedRoute = ({component: Component, token, ...rest}) => {
      return  token ? (<Route {...rest} render={matchProps => (<Component {...matchProps} />)} />) : (
      <Redirect to="/login" />
    )
  };

  const UnProtectedRoute = ({component: Component, token, ...rest}) => {
    return  token === null ? (<Redirect to="/" />) : (
  <Route {...rest} render={matchProps => (<Component {...matchProps} />)} />
  )
  };



class SuperContainer extends Component {

  constructor(props) {
    super(props)

    this.refreshFn = this.refreshFn.bind(this)

    this.state = {
      token : props.token
    }
  }

  refreshFn(data= {}) {
    debugger
    this.setState({
      token : data.token
    })
  }

  render() {
    return (<ApolloProvider client={this.props.client}>
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
            { this.state.token && <NavLink
              className="link dim f6 f5-ns dib mr3 black"
              activeClassName="gray"
              exact={true}
              to="/drafts"
              title="Drafts"
            >
              Drafts
            </NavLink> }
            {this.state.token ? (<Link
              to="/logout"
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
            >
             Logout
            </Link>) : (<Link
              to="/login"
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
            >
             Login
            </Link>) }
            {this.state.token && <Link
              to="/create"
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
            >
              + Create Draft
            </Link> }
          </nav>
          <div className="fl w-100 pl4 pr4">
            <Switch>
              <Route exact path="/" component={FeedPage} />
              <ProtectedRoute token={this.state.token} path="/drafts" component={DraftsPage} />
              <ProtectedRoute token={this.state.token} path="/create" component={CreatePage} />
              <Route path="/post/:id" component={DetailPage} />

              <Route token={this.state.token} path="/login" render={(props) => <LoginPage refreshFn={this.refreshFn} />}/>
              <Route token={this.state.token} path="/signup" render={(props) => <SignupPage refreshFn={this.refreshFn} />}/>
              <Route path="/logout" component={LogoutPage}/>
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </ApolloProvider>)
  }
}

function RenderDom() {
  ReactDOM.render(<SuperContainer client={client} token={token}/> ,document.getElementById('root'))
}

RenderDom()

export default SuperContainer
