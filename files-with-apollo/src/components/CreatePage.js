import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'

class CreatePage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    addPost: React.PropTypes.func,
  }

  state = {
    file: {},
    description: '',
    imageUrl: '',
    imageId: '',
    imagePreview: ''
  }

  render () {
    const { imageId, imageUrl, description, cropState, file } = this.state
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />
          {!imageId &&
          <Dropzone
            onDrop={this.onDrop}
            accept='image/*'
            multiple={false}
          >
            <div>Drop an image or click to choose</div>
          </Dropzone>}
          {cropState &&
            <div>
              <AvatarEditor
                ref='avatar'
                image={file.preview}
                crossOrigin='anonymous'
                width={250}
                height={250}
                border={0}
                borderRadius={250}
                color={[0, 0, 0, 0.3]}
              />
              <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleCrop}>Crop</button>
            </div>
          }
          {imageUrl &&
            <img src={imageUrl} role='presentation' className='w-100 mv3' />
          }
          {description && imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }

  onDrop = (files) => {
    this.setState({ file: files[0], cropState: true })
  }

  handleCrop = () => {
    const image = this.refs.avatar.getImageScaledToCanvas().toDataURL()
    const blob = this.dataURItoBlob(image)
    // prepare form data, use data key!
    let data = new FormData()
    data.append('data', blob)

    // use the file endpoint
    fetch('__FILE_API_ENDPOINT__', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(image => {
      this.setState({
        imageId: image.id,
        imageUrl: image.url,
        cropState: false
      })
    })
  }

  handlePost = async () => {
    const {description, imageId} = this.state
    await this.props.addPost({variables: { description, imageId }})

    window.location.pathname = '/'
  }
}

const addMutation = gql`
  mutation addPost($description: String!, $imageId: ID!) {
    createPost(description: $description, imageId: $imageId) {
      id
      description
      image {
        url
      }
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addPost' })(CreatePage)

export default withRouter(PageWithMutation)
