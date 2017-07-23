import React from 'react'
import Post from './Post'
import { createRefetchContainer, graphql } from 'react-relay'
import { ITEM_PER_PAGE } from '../constants'

class PostList extends React.Component {
  _loadAll = () => {
    // here pagination action
  }
  _previousPage = () => {
    // here pagination action
  }

  _nextPage = () => {
    this._loadMore()
  }

  _loadMore = () => {
    const refetchVariables = fragmentVariables => ({
      first: fragmentVariables.first + ITEM_PER_PAGE
    })
    this.props.relay.refetch(refetchVariables)
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

export default createRefetchContainer(
  PostList,
  {
    viewer: graphql.experimental`
      fragment PostList_viewer on Viewer
        @argumentDefinitions(first: { type: "Int", defaultValue: 1 }) {
        allPosts(first: $first) {
          edges {
            node {
              id
              ...Post_post
            }
          }
        }
      }
    `
  },
  graphql.experimental`
    query PostListQuery($first: Int) {
      viewer {
        ...PostList_viewer @arguments(first: $first)
      }
    }
  `
)
