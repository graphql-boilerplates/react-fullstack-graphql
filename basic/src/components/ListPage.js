import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }

  render() {
    if (this.props.feedQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    let blurClass = ''
    if (this.props.location.pathname !== '/') {
      blurClass = ' blur'
    }

    return (
      <div className={'w-100 flex justify-center pa6' + blurClass}>
        <div className="w-100 flex flex-wrap" style={{ maxWidth: 1150 }}>
          <Link
            to="/create"
            className="ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline"
          >
            <img
              src={require('../assets/plus.svg')}
              alt=""
              className="plus mb3"
            />
            <div>New Post</div>
          </Link>
          {this.props.feedQuery.feed &&
            this.props.feedQuery.feed.map(post => (
              <Post
                key={post.id}
                post={post}
                refresh={() => this.props.feedQuery.refetch()}
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
    }
  }
`

export default graphql(FEED_QUERY, {
  name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(ListPage)
