import React from 'react'
import Post from '../components/Post'

class ListPage extends React.Component {

  render () {

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allPosts.map(post =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>
    )
  }
}

export default ListPage
