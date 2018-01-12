import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'


class DetailPage extends React.Component {
  render() {
    if (this.props.postQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { post } = this.props.postQuery

    let action = this._renderAction(post)

    return (
      <div className='w-100 justify-center pa6'>
        <div
          className='close absolute right-0 top-0 pointer'
          onClick={this.props.history.goBack}
        >
          <img src={require('../assets/close.svg')} alt='' />
        </div>
        <div className='items-center black-80 fw3 title '>
          {post.title}
          <div className='flex black-80 fw3 text mt2 content'>
            {post.text}
          </div>
        </div>
        {action}
      </div>
    )
  }

  _renderAction = ({ id, isPublished }) => {
    if (!isPublished) {
      return (
        <button
        className='pa3 bg-black-10 bn dim ttu pointer'
        onClick={() => this.publishDraft(id)}
      >
        Publish
      </button>
      )
    } else {
      return (
        <button
        className='pa3 bg-black-10 bn dim ttu pointer'
        onClick={(() => this.deletePost(id))}
      >
        Delete
      </button>
      )
    }
  }

  deletePost = async (id) => {
    await this.props.deletePost({
      variables: { id },
    })
    console.log('deleted')
    this.props.history.replace('/')
  }

  publishDraft = async (id) => {
    await this.props.publishDraft({
      variables: { id },
    })
    this.props.history.replace('/')
  }
}

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      text
      isPublished
    }
  }
`

const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(POST_QUERY, {
    name: 'postQuery', // name of the injected prop: this.props.postQuery...
    options: props => ({
      // https://www.apollographql.com/docs/react/basics/queries.html#options-from-props
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(PUBLISH_MUTATION, {
    name: 'publishDraft',
  }),
  graphql(DELETE_MUTATION, {
    name: 'deletePost',
  }),
  withRouter,
)(DetailPage)