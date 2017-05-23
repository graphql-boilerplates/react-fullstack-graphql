import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LoginDigits extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    signinUser: PropTypes.func.isRequired,
  }

  _successfulLogin = (loginResponse) => {
    var oAuthHeaders = loginResponse.oauth_echo_headers
    var variables = {
      credentials: oAuthHeaders['X-Verify-Credentials-Authorization'],
      apiUrl: oAuthHeaders['X-Auth-Service-Provider']
    }

    this.props.signinUser({variables})
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        this.props.router.replace('/')
        location.reload()
      }).catch((e) => {
      console.error(e)
      this.props.router.replace('/')
    })
  }

  _failedLogin = (e) => {
    console.error(e)
    this.props.router.replace('/')
  }

  _showLogin = () => {
    Digits.logIn() // eslint-disable-line no-undef
      .done(this._successfulLogin)
      .fail(this._failedLogin)
  }

  render() {
    return (
      <div>
        <span
          onClick={this._showLogin}
          className='dib pa3 white bg-blue dim pointer'
        >
          Log in with Digits
        </span>
      </div>
    )
  }
}

const signinUser = gql`
  mutation ($credentials: String!, $apiUrl: String!) { 
    signinUser(digits: {credentials: $credentials, apiUrl: $apiUrl}) {
      token
    }
  }
`

export default graphql(signinUser, {name: 'signinUser'})(
  withRouter(LoginDigits)
)
