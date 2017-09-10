import React from 'react'
import Post from './Post'
import { createRefetchContainer, graphql } from 'react-relay'
import { ITEM_PER_PAGE } from '../constants'

class PostList extends React.Component {
  state = {
    skip: 0,
    first: ITEM_PER_PAGE
  }

  _hasPreviousPage = () => {
    const { skip } = this.state
    return 0 < skip
  }

  _hasNextPage = () => {
    const { skip, first } = this.state
    const { count } = this.props.viewer.allPosts
    return skip < count - first
  }

  _loadAll = () => {
    this.setState({ skip: 0, first: 1000 }, () => {
      this._loadMore()
    })
  }

  _previousPage = () => {
    const { skip, first } = this.state
    if (this._hasPreviousPage()) {
      this.setState({ skip: skip - first }, () => {
        this._loadMore()
      })
    }
  }

  _nextPage = () => {
    const { skip, first } = this.state
    if (this._hasNextPage()) {
      this.setState({ skip: skip + first }, () => {
        this._loadMore()
      })
    }
  }

  _loadMore = () => {
    const refetchVariables = {
      skip: this.state.skip,
      first: this.state.first
    }
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
          {this._hasPreviousPage() ? (
            <span
              className="bg-white w-25 pa4 ttu dim black no-underline"
              onClick={() => this._previousPage()}
            >
              Previous
            </span>
          ) : null}
          {this._hasNextPage() ? (
            <span
              className="bg-white w-25 pa4 ttu dim black no-underline"
              onClick={() => this._nextPage()}
            >
              Next
            </span>
          ) : null}
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
        @argumentDefinitions(
          skip: { type: "Int", defaultValue: 0 }
          first: { type: "Int", defaultValue: 2 }
        ) {
        allPosts(skip: $skip, first: $first)
          @connection(key: "PostList_allPosts", filters: []) {
          count
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
    query PostListQuery($skip: Int, $first: Int) {
      viewer {
        ...PostList_viewer @arguments(skip: $skip, first: $first)
      }
    }
  `
)
