import React from 'react'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router'
import ListPage from './ListPage'
import NewPostLink from './NewPostLink'

class App extends React.Component {

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    location.reload()
  }

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _isLoggedIn = () => {
    return this.props.data.loggedInUser && this.props.data.loggedInUser.id !== null
  }

  render () {

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    console.log(this.props)
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
          User ID: {this.props.data.loggedInUser.id}
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
          <div className='w-100 pa4 flex justify-center'>
            <span
              onClick={this._showLogin}
              className='dib pa3 white bg-blue dim pointer'
            >
              Log in with Email
            </span>
          </div>
          <div className='w-100 flex justify-center'>
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

const userQuery = gql`
  query {
    loggedInUser {
      id
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(App))
