import React from 'react'
import { Link } from 'react-router'
import Relay from 'react-relay/classic'
import Post from '../components/Post'

class ListPage extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object,
  }

  render () {
    return (
      <div className='w-100 flex justify-center'>
        <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Post
        </Link>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.viewer.allPosts.edges.map(({node}) =>
            <Post key={node.id} post={node} viewer={this.props.viewer} />
          )}
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(ListPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allPosts(first: 1000, orderBy: createdAt_DESC) {
          edges {
            node {
              id
              ${Post.getFragment('post')}
            }
          }
        }
        ${Post.getFragment('viewer')}
      }
    `,
  },
})
