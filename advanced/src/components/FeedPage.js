import React, { Component, Fragment } from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class FeedPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }

  componentDidMount() {
    this.props.subscribeToNewFeed()
  }

  render() {
    if (this.props.feedQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <h1>Feed</h1>
        {this.props.feedQuery.feed &&
          this.props.feedQuery.feed.map(post => (
            <Post
              key={post.id}
              post={post}
              refresh={() => this.props.feedQuery.refetch()}
              isDraft={!post.published}
            />
          ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      content
      title
      published
      author {
        name
      }
    }
  }
`
const FEED_SUBSCRIPTION = gql`
  subscription FeedSubscription {
    feedSubscription {
      node {
        id
        content
        title
        published
        author {
          name
        }
      }
    }
  }
`

export default graphql(FEED_QUERY, {
  name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
  props: props =>
    Object.assign({}, props, {
      subscribeToNewFeed: params => {
        return props.feedQuery.subscribeToMore({
          document: FEED_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev
            }
            const newPost = subscriptionData.data.feedSubscription.node
            if (prev.feed.find(post => post.id === newPost.id)) {
              return prev
            }
            return Object.assign({}, prev, {
              feed: [...prev.feed, newPost],
            })
          },
        })
      },
    }),
})(FeedPage)
