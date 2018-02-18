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
  export default {
    data: () => ({
      email: '',
      password: ''
    }),
    // Attribute
    methods: {
      create() {
        const email = this.email
        const password = this.password
        // Mutation
        this.$apollo.mutate({
          mutation: LOGIN_USER,
          variables: {
            email,
            password,
          },
        }).then((data) => {
          // Result
          console.log(data);
          this.$router.push({ path: 'Blog' })
        }).catch((error) => {
          // Error
          alert(`Error from ${error}`)
          console.error(error)
        })
      },
      saveUserData (user, token) {
        // localStorage.setItem(USER_ID, user)
        localStorage.setItem(AUTH_TOKEN, token)
        this.$root.$data.token = localStorage.getItem(USER_TOKEN)
      }
    },
    computed: {
      canLogin: function () {
        return {
          disabled: !this.email && !this.password
        }
      },
      classObject: function(){
        return {
          dim: this.email && this.password
        }
      }
    }
  }

export default withRouter(LoginPage)
