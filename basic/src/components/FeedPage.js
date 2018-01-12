import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class FeedPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }

  render() {
    if (this.props.feedQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <div className={'w-100 justify-center pa6'}>
        <div className='w-100' style={{ maxWidth: 1150 }}>
          <Link
            to='/drafts'
            className='ma3 box new-post no-underline'
          >
            <div className='black-80 fw3 description no-underline'>View Drafts</div>
          </Link>
          {this.props.feedQuery.feed &&
            this.props.feedQuery.feed.map(post => (
              <Post
                key={post.id}
                post={post}
                refresh={() => this.props.feedQuery.refetch()}
                isDraft={!post.isPublished}
              />
            ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
    }
  }
`

export default graphql(FEED_QUERY, {
  name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(FeedPage)
