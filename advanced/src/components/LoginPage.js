import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { USER_ID, AUTH_TOKEN  } from '../constant'


class LoginPage extends React.Component {

  state = {
    email: '',
    password: '',
    name: '',
    text:''
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <div>
          <h3>Do not have an account? <a href="/signup">Signup</a></h3>
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
          {this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.authenticateUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  authenticateUser = async () => {
    const {email, password} = this.state

    //const response = await this.props.authenticateUserMutation({variables: {email, password}})
    localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN)
    this.props.history.replace('/')
  }

}

const LOGIN_USER = gql `
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user{
          id
          name
          email
        }
      }
    }
  `

export default graphql(LOGIN_USER,
{ name: 'loggedInUserQuery', options: { fetchPolicy: 'network-only' }})(withRouter(LoginPage))


