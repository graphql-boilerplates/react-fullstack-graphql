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
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'


import FeedPage from './components/FeedPage'
import DraftsPage from './components/DraftsPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import PageNotFound from './components/PageNotFound'

import 'tachyons'
import './index.css'

const networkInterface = createBatchingNetworkInterface({
  uri: 'http://localhost:4000'
})

const wsClient = new SubscriptionClient('__SUBSCRIPTION_API_ENDPOINT__', {
  reconnect: true,
  connectionParams: {
    Authorisation: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  }
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

networkInterface.use([{
  applyBatchMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true
})



const ProtectedRoute = ({ component: Component, isAuthorized, logout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isAuthorized
        ? <Component logout={logout} />
        : <Redirect to={`/`} />;
    }}
  />
);

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
            to="/create"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            + Create Draft
          </Link>
        </nav>
        <div className="fl w-100 pl4 pr4">
          <Switch>
            <Route exact path="/" component={FeedPage} />
            <Route path="/drafts" component={DraftsPage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/post/:id" component={DetailPage} />
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
