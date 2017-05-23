import React, { Component, PropTypes } from 'react'
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'

import 'graphiql/graphiql.css'

const defaultQuery = `{
  allPosts {
    title
    # secretComment
  }
}`

export default class Playground extends Component {

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    authToken: PropTypes.string,
  }

  render() {
    const graphQLFetcher = (graphQLParams) => {
      const headers = { 'Content-Type': 'application/json' }
      if (this.props.authToken) {
        headers['Authorization'] = `Bearer ${this.props.authToken}`
      }

      return fetch(this.props.endpoint, {
        method: 'post',
        headers,
        body: JSON.stringify(graphQLParams),
      }).then(response => response.json())
    }

    return (
      <GraphiQL
        fetcher={graphQLFetcher}
        defaultQuery={defaultQuery}
      />
    )
  }
}

