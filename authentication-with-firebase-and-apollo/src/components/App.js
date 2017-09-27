import React from 'react'
import { withRouter } from 'react-router'
import ListPage from './ListPage'
import NewPostLink from './NewPostLink'
import { gql, graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'

class App extends React.Component {

  _isLoggedIn = () => {
    const loggedIn = this.props.data.loggedInUser &&
      this.props.data.loggedInUser.id &&
      this.props.data.loggedInUser.id !== ''
    return loggedIn
  }

  _logout = () => {
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  render () {

    if (this.props.data.loading) {
      return <div>Loading</div>
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
          Logged in as ${this.props.data.loggedInUser.id}
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
          <div>
            <Link
              className='dib pa3 white bg-blue dim pointer no-underline'
              to='/login'
            >
              Log in with Firebase
            </Link>
          </div>
          <span>Log in to create new posts</span>
        </div>
        <ListPage />
      </div>
    )
  }
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only'} })
) (withRouter(App))
