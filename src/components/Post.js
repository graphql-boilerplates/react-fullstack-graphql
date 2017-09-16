import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Link } from 'react-router'

class Post extends React.Component {
  render() {
    const { id, imageUrl, description } = this.props.post
    return (
      <div className="pa3 bg-black-05 ma3">
        <Link to={`/post/${id}`}>
          <div
            className="w-100"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              paddingBottom: '100%'
            }}
          />
        </Link>
        <div className="pt3">{description}&nbsp;</div>
      </div>
    )
  }
}

export default createFragmentContainer(
  Post,
  graphql`
    fragment Post_post on Post {
      id
      description
      imageUrl
    }
  `
)
