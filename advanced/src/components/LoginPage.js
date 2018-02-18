import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LoginPage extends React.Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h3>Do not have an account? <a href="/signup">Signup</a></h3>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Email"
            type="email"
            value={this.state.title}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Password"
            type="password"
            value={this.state.title}
          />
          <a class="f6 link dim ph3 pv2 mb2 dib white bg-navy" href="#0">Submit</a>
        </form>
      </div>
    )
  }
}

const LOGIN_USER = gql `
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, text: $password) {
        token
        user{
          id
          name
          email
        }
      }
    }
  `
export default withRouter(LoginPage)
