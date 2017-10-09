import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql, compose } from 'react-apollo'


class CreatePost extends React.Component {

  state = {
    description: '',
    imageUrl: '',
  }

  render () {
    if (this.props.data.loading) {
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
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
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
    if (!this.props.data.loggedInUser) {
      console.warn('only logged in users can create new posts')
      return
    }

    const { description, imageUrl } = this.state
    const authorId = this.props.data.loggedInUser.id

    await this.props.mutate({variables: { description, imageUrl, authorId }})
    this.props.router.replace('/')
  }
}

const createPost = gql`
  mutation ($description: String!, $imageUrl: String!, $authorId: ID!) {
    createPost(description: $description, imageUrl: $imageUrl, authorId: $authorId) {
      id
    }
  }
`

const userQuery = gql`
  query {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(createPost),
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})
)(withRouter(CreatePost))
