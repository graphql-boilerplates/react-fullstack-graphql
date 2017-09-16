import React from 'react'
import Post from './Post'
import { createPaginationContainer, graphql } from 'react-relay'
import { ITEM_PER_PAGE } from '../constants'
import DeletePostMutation from '../mutations/DeletePostMutation'

class PostList extends React.Component {
  _hasNextPage = () => {
    return this.props.relay.hasMore()
  }

  _loadMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return
    }

    this.props.relay.loadMore(ITEM_PER_PAGE)
  }

  _handleDelete = postId => {
    DeletePostMutation(postId)
  }

  render() {
    const { viewer } = this.props
    return (
      <div>
        <div className="w-100 flex flex-row justify-between">
          {this._hasNextPage() ? (
            <span
              className="bg-white w-25 pa4 ttu dim black no-underline"
              onClick={() => this._loadMore()}
            >
              Load More
            </span>
          ) : null}
        </div>
        <div className="w-100 flex flex-column items-center">
          {viewer.allPosts.edges.map(({ node }) => (
            <div className="w-60" key={node.id}>
              <Post post={node} />
              <span
                className="red f6 pointer dim"
                onClick={() => this._handleDelete(node.id)}
              >
                Delete
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default createPaginationContainer(
  PostList,
  {
    viewer: graphql.experimental`
      fragment PostList_viewer on Viewer {
        allPosts(first: $count, after: $cursor)
          @connection(key: "PostList_allPosts", filters: []) {
          edges {
            node {
              id
              ...Post_post
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.allPosts
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor
      }
    },
    query: graphql.experimental`
      query PostListQuery($count: Int!, $cursor: String) {
        viewer {
          ...PostList_viewer
        }
      }
    `
  }
)
