import React from 'react'
import { withRouter } from 'react-router'
import CreatePostMutation from './CreatePostMutation'

class CreatePage extends React.Component {

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
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this._handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }

  _handlePost = () => {
    const {description, imageUrl} = this.state
    CreatePostMutation(description, imageUrl, () => this.props.router.replace('/'))
  }

}

export default withRouter(CreatePage)