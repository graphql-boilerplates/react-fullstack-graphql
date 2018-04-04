import React from 'react'
import { withRouter } from 'react-router-dom'

class LogoutPage extends React.Component {
  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form>
          <h1>You are logged out. To see the drafts Kindly login :)</h1>
        </form>
      </div>
    )
  }
}

export default withRouter(LogoutPage)
