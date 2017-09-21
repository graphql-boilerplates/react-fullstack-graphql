import React from 'react'
import { withRouter } from 'react-router'

class CreateLogin extends React.Component {

  state = {
    email: '',
    password: '',
  }

  render () {

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

          {this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.loginUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  loginUser = async () => {
    
  }
  
}

export default withRouter(CreateLogin)
