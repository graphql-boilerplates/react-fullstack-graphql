import React from 'react'
import Relay from 'react-relay/classic'
import DeletePostMutation from '../mutations/DeletePostMutation'

class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
    viewer: React.PropTypes.object,
  }

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div
          className='w-100'
          style={{
            backgroundImage: `url(${this.props.post.imageUrl})`,
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

  handleDelete = () => {
    const viewerId = this.props.viewer.id
    const postId = this.props.post.id
    Relay.Store.commitUpdate(new DeletePostMutation({viewerId, postId}))
  }
}

export default Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        imageUrl
        description
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  },
})
