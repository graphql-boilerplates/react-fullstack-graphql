import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import ListPage from './ListPage'
import NewPostLink from './NewPostLink'
import LoginDigits from './LoginDigits'

class App extends React.Component {
  componentDidMount() {
    if (!window.digitsInitialized) {
      Digits.init({ consumerKey: '__CONSUMER_KEY__' }) // eslint-disable-line no-undef
        .done(() => {
          window.digitsInitialized = true
          console.log('Digits is initialized')
        })
        .fail(() => {
          console.log('Digits failed to initialize')
        })
    }
  }

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
    location.reload()
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
      <div>
        <span>
          Logged in as {this.props.data.user.name}
        </span>
        <div className='pv3'>
          <span
            className='dib bg-red white pa3 pointer dim'
            onClick={this._logout}
          >
            Logout
          </span>
        </div>
        <ListPage />
        <NewPostLink />
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <div className='pv3'>
          <LoginDigits />
          <span>Log in to create new posts</span>
          <div>
            <span
              onClick={this._showSignup}
              className='dib pa3 white bg-blue dim pointer'
            >
              Sign up with Digits
            </span>
          </div>
        </div>
        <ListPage />
      </div>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
      name
    }
  }
`

export default graphql(userQuery, { options: {forceFetch: true }})(withRouter(App))
