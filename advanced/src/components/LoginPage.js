import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constant'

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <div>
          <h3>
            Do not have an account? <a href="/signup">Signup</a>
          </h3>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Email"
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Password"
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
          />
          {this.state.email &&
            this.state.password && (
              <button
                className="pa3 bg-black-10 bn dim ttu pointer"
                onClick={this._login}
              >
                Log in
              </button>
            )}
        </div>
      </div>
    )
  }

  _login = () => {
    const { email, password } = this.state
    this.props
      .loginMutation({
        variables: {
          email: email,
          password: password,
        },
      })
      .then(result => {
        const token = result.data.login.token
        localStorage.setItem(AUTH_TOKEN, token)
        this.props.refreshTokenFn &&
          this.props.refreshTokenFn({
            [AUTH_TOKEN]: token,
          })

        this.props.history.replace('/')
      })
      .catch(err => {
        console.log('error')
      })
  }
}

const LOGIN_USER = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export default graphql(LOGIN_USER, { name: 'loginMutation' })(withRouter(LoginPage))
