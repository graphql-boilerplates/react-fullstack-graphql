import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import gql from 'graphql-tag'

class CreatePage extends React.Component {
  state = {
    title: '',
    text: '',
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel="Create Draft"
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div className="pa4 flex justify-center bg-white">
          <div style={{ maxWidth: 400 }} className="">
            {this.state.text && (
              <img src={this.state.text} alt="" className="w-100 mv3" />
            )}
            <input
              className="w-100 pa3 mv2"
              value={this.state.text}
              placeholder="Image Url"
              onChange={e => this.setState({ text: e.target.value })}
              autoFocus
            />
            <input
              className="w-100 pa3 mv2"
              value={this.state.title}
              placeholder="Description"
              onChange={e => this.setState({ title: e.target.value })}
            />
            {this.state.title &&
              this.state.text && (
                <button
                  className="pa3 bg-black-10 bn dim ttu pointer"
                  onClick={this.handlePost}
                >
                  Post
                </button>
              )}
          </div>
        </div>
      </Modal>
    )
  }

  handlePost = async () => {
    const { title, text } = this.state
    await this.props.createDraftMutation({
      variables: { title, text },
    })
    this.props.history.replace('/')
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_DRAFT_MUTATION, {
  name: 'createDraftMutation', // name of the injected prop: this.props.createDraftMutation...
})(CreatePage)
export default withRouter(CreatePageWithMutation)
