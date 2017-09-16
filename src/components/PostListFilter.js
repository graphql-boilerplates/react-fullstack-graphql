import React from 'react'
import PostList from './PostList'
import TextInput from './TextInput'
import { createRefetchContainer, graphql } from 'react-relay'
import { Link } from 'react-router'
import NewPostSubscription from '../subscriptions/NewPostSubscription'
import UpdatePostSubscription from '../subscriptions/UpdatePostSubscription'
import DeletePostSubscription from '../subscriptions/DeletePostSubscription'

class PostListFilter extends React.Component {
  state = {
    orderBy: 'createdAt_DESC',
    filter: ''
  }

  _search = filter => {
    this.setState({ filter }, () => {
      this._loadMore()
    })
  }

  _loadAll = () => {
    this.setState({ filter: '' }, () => {
      this._loadMore()
    })
  }

  _loadMore = () => {
    const refetchVariables = {
      ...this.state,
      filter: { description_contains: this.state.filter }
    }
    this.props.relay.refetch(refetchVariables)
  }

  async componentDidMount() {
    NewPostSubscription()
    UpdatePostSubscription()
    DeletePostSubscription()
  }

  render() {
    return (
      <div>
        <div className="w-100 flex flex-row justify-between">
          <span
            className="bg-white w-25 pa4 ttu dim black no-underline"
            onClick={() => this._loadAll()}
          >
            Load All
          </span>
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
        <PostList viewer={this.props.viewer} />
      </div>
    )
  }
}

export default createRefetchContainer(
  PostListFilter,
  {
    viewer: graphql.experimental`
      fragment PostListFilter_viewer on Viewer
        @argumentDefinitions(
          orderBy: { type: "PostOrderBy", defaultValue: "createdAt_DESC" }
          filter: { type: "PostFilter" }
        ) {
        ...PostList_viewer
      }
    `
  },
  graphql.experimental`
    query PostListFilterQuery($orderBy: PostOrderBy, $filter: PostFilter) {
      viewer {
        ...PostListFilter_viewer @arguments(orderBy: $orderBy, filter: $filter)
      }
    }
  `
)
