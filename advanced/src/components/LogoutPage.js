import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LogoutPage extends React.Component {
  state = {
    title: '',
    text: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>You are logged out</h1>
        </form>
      </div>
    )
  }

}

export default withRouter(LogoutPage)
