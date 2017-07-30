import React from 'react'
import Post from './Post'
import { createFragmentContainer, graphql } from 'react-relay'

class PostList extends React.Component {
  _loadAll = () => {
    // here pagination action
  }
  _previousPage = () => {
    // here pagination action
  }

  _nextPage = () => {
    // here pagination action
  }

  render() {
    const { viewer } = this.props
    return (
      <div>
        <div className="w-100 flex flex-row justify-between">
          <span
            className="bg-white w-25 pa4 ttu dim black no-underline"
            onClick={() => this._loadAll()}
          >
            Load All
          </span>
          <span
            className="bg-white w-25 pa4 ttu dim black no-underline"
            onClick={() => this._previousPage()}
          >
            Previous
          </span>
          <span
            className="bg-white w-25 pa4 ttu dim black no-underline"
            onClick={() => this._nextPage()}
          >
            Next
          </span>
        </div>
        <div className="w-100 flex flex-column items-center">
          {viewer.allPosts.edges.map(({ node }) => (
            <div className="w-60" key={node.id}>
              <Post post={node} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(
  PostList,
  graphql`
    fragment PostList_viewer on Viewer {
      id
      allPosts(first: 1000, orderBy: createdAt_DESC)
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
