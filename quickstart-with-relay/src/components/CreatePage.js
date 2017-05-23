import React from 'react'
import Relay from 'react-relay/classic'
import { withRouter } from 'react-router'
import CreatePostMutation from '../mutations/CreatePostMutation'

class CreatePage extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object,
    router: React.PropTypes.object,
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
            <img src={this.state.imageUrl} className='w-100 mv3' />
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
    const viewerId = this.props.viewer.id
    Relay.Store.commitUpdate(
      new CreatePostMutation({viewerId, description, imageUrl}),
      {
        onSuccess: () => this.props.router.replace('/'),
      }
    )
  }
}

export default Relay.createContainer(withRouter(CreatePage), {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  },
})
