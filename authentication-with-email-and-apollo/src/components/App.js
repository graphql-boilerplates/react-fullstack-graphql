import React from 'react'
import { withRouter } from 'react-router'
import ListPage from './ListPage'
import NewPostLink from './NewPostLink'

class App extends React.Component {

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
  }

  _showLogin = () => {
    console.log(`Show login`)
    this.props.history.push('/login')
  }

  _showSignup = () => {
    this.props.history.push('/signup')
  }

  _isLoggedIn = () => {
    return false
  }

  render () {

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
          Logged in as ...
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
            <span
              onClick={this._showLogin}
              className='dib pa3 white bg-blue dim pointer'
            >
              Log in with Email
            </span>
          </div>
          <span>Log in to create new posts</span>
          <div>
            <span
              onClick={this._showSignup}
              className='dib pa3 white bg-blue dim pointer'
            >
              Sign up with Email
            </span>
          </div>
        </div>
        <ListPage />
      </div>
    )
  }
}

export default withRouter(App)
