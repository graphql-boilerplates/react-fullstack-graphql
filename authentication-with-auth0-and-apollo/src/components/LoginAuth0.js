import React, { Component, PropTypes } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'

class LoginAuth0 extends Component {

  constructor (props) {
    super(props)

    this._lock = new Auth0Lock(props.clientId, props.domain)
  }

  static propTypes = {
    clientId: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this._lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      this.props.history.push(`/signup`)
    })
  }

  _showLogin = () => {
    this._lock.show()
  }

  render() {
    return (
      <div>
        <span
          onClick={this._showLogin}
          className='dib pa3 white bg-blue dim pointer'
        >
          Log in with Auth0
        </span>
      </div>
    )
  }
}

export default withRouter(LoginAuth0)
