import React from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class ListPage extends React.Component {

  render () {
    console.log('ListPage - render - environment', this.props.relay.environment)
    return (
      <div className='w-100 flex justify-center'>
        <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Post
        </Link>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.viewer.allPosts.edges.map(({node}) =>
            <Post key={node.id} post={node} viewer={this.props.viewer} />
          )}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(ListPage, graphql`
  fragment ListPage_viewer on Viewer {
    ...Post_viewer
    allPosts(last: 100, orderBy: createdAt_DESC) @connection(key: "ListPage_allPosts", filters: []) {
      edges {
        node {
          id
          description
          imageUrl
          ...Post_post
        }
      }
    }
  }
`)