import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql, compose } from 'react-apollo'

class CreateUser extends React.Component {

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
    if (this.props.data.loggedInUser.id) {
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

          {this.state.name && this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.createUser}>Sign up</button>
          }
        </div>
      </div>
    )
  }

  createUser = async () => {
    const { email, password, name } = this.state

    try {
      const user = await this.props.createUser({variables: {email, password, name}})
      console.log(`received response: `, user)
      localStorage.setItem('graphcoolToken', user.data.signupUser.token)
      this.props.router.replace('/')
    } catch (e) {
      console.error(`An error occured: `, e)
      this.props.router.replace('/')
    }

  }
}

const createUser = gql`
  mutation ($email: String!, $password: String!, $name: String) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

const userQuery = gql`
  query {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(createUser, {name: 'createUser'}),
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }}),
)(withRouter(CreateUser))