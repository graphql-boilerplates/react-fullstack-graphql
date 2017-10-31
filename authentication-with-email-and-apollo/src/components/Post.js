import React from 'react'
import PropTypes from 'prop-types'

export default class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object,
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
        </div>
      </div>
    )
  }
}
