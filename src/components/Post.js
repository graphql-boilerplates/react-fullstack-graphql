import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Link } from 'react-router'
import TextInput from './TextInput'
import UpdatePostMutation from '../mutations/UpdatePostMutation'

class Post extends React.Component {
  state = {
    editing: false
  }
  _updatePost = description => {
    const { id, imageUrl } = this.props.post
    UpdatePostMutation(id, description, imageUrl, () => {
      this.setState({ editing: false })
    })
  }

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
        {this.state.editing ? (
          <TextInput
            className="pt3"
            initialValue={description}
            onSave={this._updatePost}
          />
        ) : (
          <div
            className="pt3"
            onClick={() => {
              this.setState({ editing: true })
            }}
          >
            {description}&nbsp;
          </div>
        )}
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
