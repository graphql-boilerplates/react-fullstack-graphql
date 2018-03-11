import React from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import FeedPage from './FeedPage'
import DraftsPage from './DraftsPage'
import CreatePage from './CreatePage'
import DetailPage from './DetailPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import PageNotFound from './PageNotFound'
import LogoutPage from './LogoutPage'
import { AUTH_TOKEN } from '../constant'
import { isTokenExpired } from '../helper/jwtHelper'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} render={matchProps => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/login" />
  )
}

class SuperContainer extends React.Component {

  constructor(props) {
    super(props)
    this.refreshTokenFn = this.refreshTokenFn.bind(this)

    this.state = {
      token: props.token,
    }
  }

  refreshTokenFn(data = {}) {
    const token = data.AUTH_TOKEN

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
    }

    this.setState({
      token: data.AUTH_TOKEN,
    })
  }

  bootStrapData() {
    try {
      const token = localStorage.getItem(AUTH_TOKEN)
      if (token !== null && token !== undefined) {
        const expired = isTokenExpired(token)
        if (!expired) {
          this.setState({ token: token })
        } else {
          localStorage.removeItem(AUTH_TOKEN)
          this.setState({ token: null })
        }
      }
    } catch (e) {
      console.log('')
    }
  }

  //verify localStorage check
  componentDidMount() {
    this.bootStrapData()
    this.props.subscribeToNewMessage();
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          {this.renderNavBar()}
          {this.renderRoute()}
        </React.Fragment>
      </Router>
    )
  }

  renderNavBar() {
    return (
      <nav className="pa3 pa4-ns">
        <Link className="link dim black b f6 f5-ns dib mr3" to="/" title="Feed">
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
        {this.props.data &&
          this.props.data.me &&
          this.props.data.me.email &&
          this.state.token && (
            <NavLink
              className="link dim f6 f5-ns dib mr3 black"
              activeClassName="gray"
              exact={true}
              to="/drafts"
              title="Drafts"
            >
              Drafts
            </NavLink>
          )}
        {this.state.token ? (
          <div
            onClick={() => {
              this.refreshTokenFn &&
                this.refreshTokenFn({
                  [AUTH_TOKEN]: null,
                })
              window.location.href = '/'
            }}
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            Logout
          </div>
        ) : (
          <Link
            to="/login"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            Login
          </Link>
        )}
        {this.props.data &&
          this.props.data.me &&
          this.props.data.me.email &&
          this.state.token && (
            <Link
              to="/create"
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
            >
              + Create Draft
            </Link>
          )}
      </nav>
    )
  }

  renderRoute() {
    return (
      <div className="fl w-100 pl4 pr4">
        <Switch>
          <Route exact path="/" component={FeedPage} />
          <ProtectedRoute
            token={this.state.token}
            path="/drafts"
            component={DraftsPage}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/create"
            component={CreatePage}
          />
          <Route path="/post/:id" component={DetailPage} />
          <Route
            token={this.state.token}
            path="/login"
            render={props => <LoginPage refreshTokenFn={this.refreshTokenFn} />}
          />
          <Route
            token={this.state.token}
            path="/signup"
            render={props => (
              <SignupPage refreshTokenFn={this.refreshTokenFn} />
            )}
          />
          <Route path="/logout" component={LogoutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }

}

//me query
const ME = gql`
  query me {
    me {
      id
      email
      name
    }
  }
`

const feedSubscribe = gql`
  subscription {
    feedSubscription {
      id
      text
    }
  }
`;

export default graphql(ME, {
  options: {
    errorPolicy: 'all'
  },
  props: props =>
    Object.assign({}, props, {
      subscribeToNewMessage: params => {
        console.log(props);
        return props.data.subscribeToMore({
          document: feedSubscribe,
          updateQuery: (prev, { subscriptionData }) => {
            console.log("subscribed data", subscriptionData);
            if (!subscriptionData.data) {
              return prev;
            }
            const newMessage = subscriptionData.data.feedSubscription;
            console.log(newMessage, prev.messages);
            if (prev.messages.find(message => message.id === newMessage.id)) {
              return prev;
            }
            return Object.assign({}, prev, {
              messages: [...prev.messages, newMessage]
            });
          }
        });
      }
    })
})(SuperContainer)
