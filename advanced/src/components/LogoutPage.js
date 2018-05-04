import React from 'react'
import { withRouter } from 'react-router-dom'

const LogoutPage = () => (
  <div className="pa4 flex justify-center bg-white">
    <form>
      <h1>You are currently logged out. To see the drafts, please login.</h1>
    </form>
  </div>
)

export default withRouter(LogoutPage)
