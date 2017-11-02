import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePost extends React.Component {

  state = {
    description: '',
    imageUrl: '',
  }

  render () {
    if (this.props.loggedInUserQuery.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.imageUrl}
            placeholder='Image Url'
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} alt='' className='w-100 mv3' />
          }
          {this.state.description && this.state.imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }

  handlePost = async () => {
    // redirect if no user is logged in
    if (!this.props.loggedInUserQuery.loggedInUser) {
      console.warn('only logged in users can create new posts')
      return
    }

    const { description, imageUrl } = this.state
    const authorId = this.props.loggedInUserQuery.loggedInUser.id

    await this.props.createPostMutation({variables: { description, imageUrl, authorId }})
    this.props.history.replace('/')
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation ($description: String!, $imageUrl: String!, $authorId: ID!) {
    createPost(description: $description, imageUrl: $imageUrl, authorId: $authorId) {
      id
    }
  }
`

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' }),
  graphql(LOGGED_IN_USER_QUERY, { 
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(CreatePost))
