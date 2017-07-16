import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../createRelayEnvironment'
import { withRouter, Link } from 'react-router-dom'
import CreatePostMutation from '../mutations/CreatePostMutation'

const CreatePageViewerQuery = graphql`
  query CreatePageViewerQuery {
    viewer {
      id
    }
  }
`;

class CreatePage extends React.Component {

  state = {
    description: '',
    imageUrl: '',
  }

  render () {
    return (
      <QueryRenderer 
        environment={environment}
        query={CreatePageViewerQuery}
        render={({error, props}) => {
          if (error) {
            return (
              <div>{error.message}</div>
            )
          } else if (props) {
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
                    <img 
                      src={this.state.imageUrl} 
                      alt={this.state.description} 
                      className='w-100 mv3' 
                    />
                  }
                  {this.state.description && this.state.imageUrl &&
                    <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={() => this._handlePost(props.viewer.id)}>Post</button>
                  }
                  <div style={{textAlign: "center", color: "red"}}>
                    <Link to="/" >Cancel</Link>
                  </div>
                </div>
              </div>
            )
          }
          return (<div>loading</div>)
        }}
      />
    )
  }

  _handlePost = (viewerId) => {
    const {description, imageUrl} = this.state
    CreatePostMutation(description, imageUrl, viewerId,  () => this.props.history.replace('/'))
  }

}

export default withRouter(CreatePage)