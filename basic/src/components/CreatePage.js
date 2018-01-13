import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreatePage extends React.Component {
  state = {
    title: '',
    text: ''
  };

  render() {
    return (
      <div className="w-100 justify-center pa6">
        <div className="pa4 flex justify-center bg-white">
          <div className="close absolute right-0 top-0 pointer" onClick={this.props.history.goBack}>
            <img src={require('../assets/close.svg')} alt="" />
          </div>
          <div style={{ maxWidth: 700 }}>
            <div className="black-80 fw3 description no-underline"> Create Draft</div>
            <input
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              style={{ width: 400 }}
              value={this.state.text}
              placeholder="Title"
              onChange={e => this.setState({ text: e.target.value })}
              autoFocus
            />
            <textarea
              placeholder="Content"
              style={{ height: 150 }}
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            />
            {this.state.title &&
              this.state.text && (
                <button className="pa3 bg-black-10 bn dim ttu pointer" onClick={this.handlePost}>
                  Post
                </button>
              )}
          </div>
        </div>
      </div>
    );
  }

  handlePost = async () => {
    const { title, text } = this.state;
    const createDraft = await this.props.createDraftMutation({
      variables: { title, text }
    });
    console.log(createDraft);
    this.props.history.replace('/');
  };
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
    }
  }
`;

const PUBLISH_MUTATION = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`;

const CreatePageWithMutation = graphql(CREATE_DRAFT_MUTATION, {
  name: 'createDraftMutation' // name of the injected prop: this.props.createDraftMutation...
})(CreatePage);
export default withRouter(CreatePageWithMutation);
