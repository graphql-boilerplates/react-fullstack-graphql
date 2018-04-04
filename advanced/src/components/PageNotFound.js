import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = ({ location }) => (
  <div>
    <p>Sorry, no page found at {location.pathname}</p>
    <Link to="/">Go Home</Link>
  </div>
)

export default PageNotFound
