import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql } from 'react-apollo'

class CreatePage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    addPost: React.PropTypes.func,
  }

  state = {
    description: '',
    imageUrl: '',
  }

  render () {
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
    this.props.addPost({ description, imageUrl })
      .then(() => {
        this.props.router.push('/')
      })
  }
}

const addMutation = gql`
  mutation addPost($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
      description
      imageUrl
    }
  }
`

const PageWithMutation = graphql(addMutation, {
  props: ({ ownProps, mutate }) => ({
    addPost: ({ description, imageUrl }) =>
      mutate({
        variables: { description, imageUrl },
        updateQueries: {
          allPosts: (state, { mutationResult }) => {
            const newPost = mutationResult.data.createPost
            return {
              allPosts: [...state.allPosts, newPost]
            }
          },
        },
      })
  })
})(withRouter(CreatePage))

export default PageWithMutation