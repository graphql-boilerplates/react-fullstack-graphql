import React from 'react'
import LoginAuth0 from './LoginAuth0'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import ListPage from './ListPage'
import NewPostLink from './NewPostLink'

const clientId = '__AUTH0_CLIENT_ID__'
const domain='__AUTH0_DOMAIN__'

class App extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken')
    location.reload()
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
          <LoginAuth0
            clientId={clientId}
            domain={domain}
          />
        </div>
        <span>Log in to create new posts</span>
        <ListPage />
      </div>
    )
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only' }})(withRouter(App))
