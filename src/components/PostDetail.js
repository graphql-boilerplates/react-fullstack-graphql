import React from 'react'
import { withRouter } from 'react-router'
import { graphql, QueryRenderer } from 'react-relay'
import environment from '../Environment'
import Post from './Post'

class PostDetail extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query PostDetailViewerQuery($postID: ID!) {
            viewer {
              Post(id: $postID) {
                ...Post_post
              }
            }
          }
        `}
        variables={{
          postID: this.props.params.id
        }}
        render={({ error, props }) => {
          if (props) {
            return <Post post={props.viewer.Post} />
          } else if (error) {
            return <div>{error.message}</div>
          }
          return <div>{'Loading...'}</div>
        }}
      />
    )
  }
}

export default withRouter(PostDetail)
