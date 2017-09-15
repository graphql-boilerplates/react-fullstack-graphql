import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql, compose } from 'react-apollo'

class CreateUser extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    createUser: React.PropTypes.func.isRequired,
    signinUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super()

    this.state = {
      email: props.location.query.email || '',
      password: '',
      name: '',
      emailSubscription: false,
    }
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

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
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

          {this.state.name && this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.createUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  createUser = async () => {
    const { email, password, name } = this.state

    try {
      const user = await this.props.createUser({variables: {email, password, name}})
      console.log(`Created user: `, user)
      const tokenData = await this.props.signinUser({variables: {email, password}})
      console.log(`Received token data: `, tokenData)

      localStorage.setItem('graphcoolToken', tokenData.data.authenticateEmailUser.token)
      this.props.router.replace('/')
    } catch (e) {
      console.error(`An error occured: `, e)
      this.props.router.replace('/')
    }

  }
}

const createEmailUser = gql`
  mutation ($email: String!, $password: String!, $name: String) {
    signupEmailUser(email: $email, password: $password, name: $name) {
      id
    }
  }
`

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    authenticateEmailUser(email: $email, password: $password) {
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

export default compose(
  graphql(createEmailUser, {name: 'createUser'}),
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }}),
  graphql(signinUser, {name: 'signinUser'})
)(withRouter(CreateUser))