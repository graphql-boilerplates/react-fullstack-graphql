import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateUser extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    createUser: React.PropTypes.func.isRequired,
    signinUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  state = {
    emailAddress: '',
    name: '',
    emailSubscription: false,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      this.props.router.replace('/')
    }

    if (!window.digitsInitialized) {
      console.warn('Digits not initialized')
      this.props.router.replace('/')
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.emailAddress}
            placeholder='Email'
            onChange={(e) => this.setState({emailAddress: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <div>
            <input
              className='w-100 pa3 mv2'
              value={this.state.emailSubscription}
              type='checkbox'
              onChange={(e) => this.setState({emailSubscription: e.target.checked})}
            />
            <span>
              Subscribe to email notifications?
            </span>
          </div>

          {this.state.name && this.state.emailAddress &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.createUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  createUser = () => {
    const {emailAddress, name, emailSubscription} = this.state

    Digits.logIn() // eslint-disable-line no-undef
      .done((loginResponse) => {
        var oAuthHeaders = loginResponse.oauth_echo_headers
        const credentials = oAuthHeaders['X-Verify-Credentials-Authorization']
        const apiUrl = oAuthHeaders['X-Auth-Service-Provider']

        this.props.createUser({variables: {emailAddress, name, emailSubscription, apiUrl, credentials}})
          .then((response) => {
            this.props.signinUser({variables: {credentials, apiUrl}})
              .then((response) => {
                window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
                this.props.router.replace('/')
              }).catch((e) => {
              console.error(e)
              this.props.router.replace('/')
            })
          }).catch((e) => {
          console.error(e)
          this.props.router.replace('/')
        })
      })
      .fail((e) => {
        console.error(e)
        this.props.router.replace('/')
      })
  }
}

const createUser = gql`
  mutation ($credentials: String!, $apiUrl: String!, $emailAddress: String!, $name: String!, $emailSubscription: Boolean!) {
    createUser(authProvider: {digits: {credentials: $credentials, apiUrl: $apiUrl}}, emailAddress: $emailAddress, name: $name, emailSubscription: $emailSubscription) {
      id
    }
  }
`

const signinUser = gql`
  mutation ($credentials: String!, $apiUrl: String!) { 
    signinUser(digits: {credentials: $credentials, apiUrl: $apiUrl}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { forceFetch: true }})(
    graphql(signinUser, {name: 'signinUser'})(
      withRouter(CreateUser))
    )
)
