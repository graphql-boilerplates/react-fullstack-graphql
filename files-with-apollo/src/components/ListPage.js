import React from 'react'
import { Link } from 'react-router'
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
        <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Post
        </Link>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              refresh={() => this.props.data.refetch()}
            />
          ))}
        </div>
      </div>
    )
  }
}

const FeedQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    description
    image {
      id
      url
    }
  }
}`

const ListPageWithData = graphql(FeedQuery)(ListPage)

export default ListPageWithData
