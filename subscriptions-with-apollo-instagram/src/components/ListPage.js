import React from 'react'
import { Link } from 'react-router'
import Post from '../components/Post'
import { graphql, gql } from 'react-apollo'

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      if (this.subscription) {
        if (newProps.data.allPosts !== this.props.data.allPosts) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription()
        } else {
          // we already have an active subscription with the right params
          return
        }
      }
      this.subscription = newProps.data.subscribeToMore({
        document: gql`
          subscription {
            Post(filter: {
              mutation_in: [CREATED]
            }) {
              node {
                id
                imageUrl
                description
              }
            }
          }
        `,
        variables: null,

        // this is where the magic happens
        updateQuery: (previousState, {subscriptionData}) => {
          const newPost = subscriptionData.data.Post.node

          return {
            allPosts: [
              {
                ...newPost
              },
              ...previousState.allPosts
            ]
          }
        },
        onError: (err) => console.error(err),
      })
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Post
        </Link>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allPosts.map((post) =>
            <Post key={post.id} post={post} refresh={() => this.props.data.refetch()} />
          )}
        </div>
      </div>
    )
  }
}

const FeedQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    imageUrl
    description
  }
}`

const ListPageWithData = graphql(FeedQuery, {
  options: {
    forceFetch: true
  }
})(ListPage)

export default ListPageWithData
