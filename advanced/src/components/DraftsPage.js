import React, { Component, Fragment } from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class DraftsPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.draftsQuery.refetch()
    }
  }

  render() {
    if (this.props.draftsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Drafts</h1>
        </div>
        {this.props.draftsQuery.drafts &&
          this.props.draftsQuery.drafts.map(draft => (
            <Post
              key={draft.id}
              post={draft}
              refresh={() => this.props.draftsQuery.refetch()}
              isDraft={!draft.isPublished}
            />
          ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const DRAFTS_QUERY = gql`
  query DraftsQuery {
    drafts {
      id
      text
      title
      isPublished
      author {
        name
      }
    }
  }
`

export default graphql(DRAFTS_QUERY, {
  name: 'draftsQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(DraftsPage)
