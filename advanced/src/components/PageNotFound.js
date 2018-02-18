import React from 'react'
import {
  Link
} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const PageNotFound = ({ location }) => (
  <div>
    <p>Sorry, no page found at {location.pathname}</p>
    <Link to="/">Go Home</Link>
  </div>
)

export default PageNotFound
