import React from 'react'
import { graphql, gql } from 'react-apollo'

class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
    mutatePost: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div
          className='w-100'
          style={{
            backgroundImage: `url(${this.props.post.image.url})`,
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
        />
        <div className='pt3'>
          {this.props.post.description}&nbsp;
          <span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>
        </div>
      </div>
    )
  }

  handleDelete = async () => {
    await this.props.mutatePost({
      variables: {
        idPost: this.props.post.id,
        idFile: this.props.post.image.id
      }
    })

    this.props.refresh()
  }
}

const deletePost = gql`
  mutation deletePost($idPost: ID!, $idFile: ID!) {
    deletePost(id: $idPost) {
      id
    }
    deleteFile(id: $idFile) {
      id
    }
  }
`

const PostWithMutation = graphql(deletePost, {name : 'mutatePost'})(Post)

export default PostWithMutation
