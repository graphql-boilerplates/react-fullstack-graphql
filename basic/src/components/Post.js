import React from 'react'
import { Link } from 'react-router-dom'

export default class Post extends React.Component {
  render() {
    return (
      <Link
        className="no-underline ma3"
        to={`/post/${this.props.post.id}`}
      >
        <div className="items-center black-80 fw3 title ">
          {this.props.post.title}
        </div>
        <div className="items-center black-80 fw3 description ">
          {this.props.post.text}
        </div>
      </Link>
    )
  }
}
