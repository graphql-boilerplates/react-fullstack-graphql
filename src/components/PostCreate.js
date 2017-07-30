import React from 'react'
import { withRouter } from 'react-router'
import { graphql, QueryRenderer } from 'react-relay'
import environment from '../Environment'
import CreatePostMutation from '../mutations/CreatePostMutation'

class PostCreate extends React.Component {
  state = {
    description: '',
    imageUrl: ''
  }
  _handlePost = () => {
    const { description, imageUrl } = this.state
    CreatePostMutation(description, imageUrl, () =>
      this.props.router.replace('/')
    )
  }
  render() {
    const { description, imageUrl } = this.state
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query PostCreateViewerQuery {
            viewer {
              id
            }
          }
        `}
        render={({ error, props }) => {
          if (props) {
            return (
              <div className="w-100 pa4 flex justify-center">
                <div style={{ maxWidth: 400 }} className="">
                  <input
                    className="w-100 pa3 mv2"
                    value={description}
                    placeholder="Description"
                    onChange={e =>
                      this.setState({ description: e.target.value })}
                  />
                  <input
                    className="w-100 pa3 mv2"
                    value={imageUrl}
                    placeholder="Image Url"
                    onChange={e => this.setState({ imageUrl: e.target.value })}
                  />
                  {imageUrl && (
                    <img src={imageUrl} className="w-100 mv3" alt="" />
                  )}
                  {description &&
                  imageUrl && (
                    <button
                      className="pa3 bg-black-10 bn dim ttu pointer"
                      onClick={() => this._handlePost(props.viewer.id)}
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            )
          } else if (error) {
            return <div>{error.message}</div>
          }
          return <div>{'Loading...'}</div>
        }}
      />
    )
  }
}

export default withRouter(PostCreate)
