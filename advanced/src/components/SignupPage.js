import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SignupPage extends React.Component {
  state = {
    title: '',
    text: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h3> Already have an account!!! <a href="/login"> Login</a></h3>
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
            placeholder="Enter Password"
            type="password"
            value={this.state.title}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Confirm Password"
            type="password"
            value={this.state.title}
          />
          <a class="f6 link dim ph3 pv2 mb2 dib white bg-navy" href="#0">Submit</a>
        </form>
      </div>
    )
  }
}

export default withRouter(SignupPage)
