import React from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import FeedPage from './FeedPage'
import DraftsPage from './DraftsPage'
import CreatePage from './CreatePage'
import DetailPage from './DetailPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import PageNotFound from './PageNotFound'
import LogoutPage from './LogoutPage'
import { ApolloProvider } from 'react-apollo'
import { AUTH_TOKEN } from '../constant'


const ProtectedRoute = ({component: Component, token, ...rest}) => {
    return  token ?
    (<Route {...rest} render={matchProps => (<Component {...matchProps} />)} />)
    :(<Redirect to="/login" />)
};

class SuperContainer extends React.Component {

  constructor(props) {
    super(props)

    this.refreshFn = this.refreshFn.bind(this)

    this.state = {
      token : props.token
    }
  }

  refreshFn(data= {}) {
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
            {this.state.token ? (<div
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                window.location.href('/')
                this.refreshFn && this.refreshFn({
                  [AUTH_TOKEN] : null
                })
              }}
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
            >
             Logout
            </div>) : (<Link
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
 export default SuperContainer
