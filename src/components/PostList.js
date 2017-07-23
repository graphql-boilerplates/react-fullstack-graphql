import React from 'react'
import Post from './Post'
import TextInput from './TextInput'
import { createRefetchContainer, graphql } from 'react-relay'
import { ITEM_PER_PAGE } from '../constants'
import { Link } from 'react-router'
import DeletePostMutation from '../mutations/DeletePostMutation'
import NewPostSubscription from '../subscriptions/NewPostSubscription'
import UpdatePostSubscription from '../subscriptions/UpdatePostSubscription'
import DeletePostSubscription from '../subscriptions/DeletePostSubscription'

class PostList extends React.Component {
  state = {
    skip: 0,
    first: ITEM_PER_PAGE,
    orderBy: 'createdAt_DESC',
    filter: ''
  }

  _search = filter => {
    this.setState({ skip: 0, first: ITEM_PER_PAGE, filter }, () => {
      this._loadMore()
    })
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
    this.setState({ skip: 0, first: 1000, filter: '' }, () => {
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
        ...this.state,
        filter: { description_contains: this.state.filter }
    }
    this.props.relay.refetch(refetchVariables)
  }

  _handleDelete = postId => {
    DeletePostMutation(postId)
  }

  async componentDidMount() {
    NewPostSubscription()
    UpdatePostSubscription()
    DeletePostSubscription()
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
          <Link
            to="/create"
            className="bg-white w-25 pa4 ttu dim black no-underline"
          >
            + New
          </Link>
        </div>
        <div className="w-100 flex flex-row justify-center">
          <TextInput
            className="pt3"
            placeholder={'search by descriptions'}
            initialValue={this.state.filter}
            onSave={this._search}
          />
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

export default createRefetchContainer(
  PostList,
  {
    viewer: graphql.experimental`
      fragment PostList_viewer on Viewer
        @argumentDefinitions(
          skip: { type: "Int", defaultValue: 0 }
          first: { type: "Int", defaultValue: 2 }
          orderBy: { type: "PostOrderBy", defaultValue: "createdAt_DESC" }
          filter: { type: "PostFilter" }
        ) {
        allPosts(
          skip: $skip
          first: $first
          orderBy: $orderBy
          filter: $filter
        ) @connection(key: "PostList_allPosts", filters: []) {
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
    query PostListQuery(
      $skip: Int
      $first: Int
      $orderBy: PostOrderBy
      $filter: PostFilter
    ) {
      viewer {
        ...PostList_viewer
          @arguments(
            skip: $skip
            first: $first
            orderBy: $orderBy
            filter: $filter
          )
      }
    }
  `
)
