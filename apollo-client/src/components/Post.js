import React from 'react'
import { Link } from 'react-router-dom'

export default class Post extends React.Component {
  render() {
    return (
      <Link
        className="bg-white ma3 box post flex flex-column no-underline br2"
        to={`/post/${this.props.post.id}`}
      >
        <div
          className="image"
          style={{
            backgroundImage: `url(${this.props.post.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingBottom: '100%',
          }}
        />
        <div className="flex items-center black-80 fw3 description">
          {this.props.post.description}
        </div>
      </Link>
    )
  }
}
