import React from 'react'
import Post from './Post'
import { createFragmentContainer, graphql } from 'react-relay'

class PostList extends React.Component {
  render() {
    const { viewer } = this.props
    return (
      <div className="w-100 flex flex-column items-center">
        {viewer.allPosts.edges.map(({ node }) => (
          <div className="w-60" key={node.id}>
            <Post post={node} />
          </div>
        ))}
      </div>
    )
  }
}

export default createFragmentContainer(
  PostList,
  graphql`
    fragment PostList_viewer on Viewer {
      id
      allPosts(first: 2147483647, orderBy: createdAt_DESC)
        @connection(key: "PostList_allPosts", filters: []) {
        edges {
          node {
            id
            ...Post_post
          }
        }
      }
    }
  `
)
