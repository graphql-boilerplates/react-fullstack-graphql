import React, { Component, PropTypes } from 'react'
import Auth0Lock from 'auth0-lock'

export default class Login extends Component {

  constructor (props) {
    super(props)

    this._lock = new Auth0Lock(props.clientId, props.domain)
  }

  static propTypes = {
    clientId: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this._lock.on('authenticated', (authResult) => {
      this.props.onLogin(authResult.idToken)
    })
  }

  _showLogin = () => {
    this._lock.show()
  }

  render() {
    return (
      <span
        onClick={this._showLogin}
        className='dib pa3 white bg-blue dim pointer'
      >
        Get Auth0 Token
      </span>
    )
  }
}

