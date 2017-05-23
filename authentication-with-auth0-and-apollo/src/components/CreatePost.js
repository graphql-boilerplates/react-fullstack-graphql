import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'

class CreatePost extends React.Component {

  static propTypes = {
    createPost: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    description: '',
    imageUrl: '',
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if no user is logged in
    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts')
      return (
        <Redirect to={{
          pathname: '/'
        }}/>
      )
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

  handlePost = () => {
    const {description, imageUrl} = this.state
    this.props.createPost({variables: {description, imageUrl}})
      .then(() => {
        this.props.history.push('/')
      })
  }
}

const createPost = gql`
  mutation createPost($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
    }
  }
`

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

export default graphql(createPost, {
  props({ownProps, mutate}) {
    return {
      createPost({variables}) {
        return mutate({
          variables: {...variables},
          updateQueries: {
            FeedQuery: (prev, {mutationResult}) => {
              const newPost = mutationResult.data.createPost
              return {
                allPosts: [...mutationResult.allPosts, newPost]
              }
            },
          },
        })
      },
    }
  }
})(
  graphql(userQuery, { options: {fetchPolicy: 'network-only'}} )(withRouter(CreatePost))
)
