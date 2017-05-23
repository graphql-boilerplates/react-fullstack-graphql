import React from 'react'
import Post from '../components/Post'
import { graphql, gql } from 'react-apollo'

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allPosts.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>
    )
  }
}

const FeedQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
    imageUrl
    description
  }
}`

export default graphql(FeedQuery)(ListPage)
