import React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    height: 761,
  },
}

class DetailPage extends React.Component {

  render() {
    if (this.props.postQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    const {Post} = this.props.postQuery

    return (
      <Modal
        isOpen
        contentLabel='Create Post'
        style={detailModalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div
          className='close fixed right-0 top-0 pointer'
          onClick={this.props.history.goBack}
        >
          <img src={require('../assets/close.svg')} alt='' />
        </div>
        <div
          className='delete ttu white pointer fw6 absolute left-0 top-0 br2'
          onClick={this.handleDelete}
        >
          Delete
        </div>
        <div
          className='bg-white detail flex flex-column no-underline br2 h-100'
        >
          <div
            className='image'
            style={{
              backgroundImage: `url(${Post.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              paddingBottom: '100%',
            }}
          />
          <div className='flex items-center black-80 fw3 description'>
            {Post.description}
          </div>
        </div>
      </Modal>
    )
  }

  handleDelete = async () => {
    await this.props.deletePostMutation({variables: {id: this.props.postQuery.Post.id}})
    this.props.history.replace('/')
  }
}

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    Post(id: $id) {
      id
      imageUrl
      description
    }
  }
`

const DetailPageWithGraphQL = compose(
  graphql(POST_QUERY, {
    name: 'postQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: match.params.id,
      },
    }),
  }),
  graphql(DELETE_POST_MUTATION, {
    name: 'deletePostMutation'
  })
)(DetailPage)



const DetailPageWithDelete = graphql(DELETE_POST_MUTATION)(DetailPageWithGraphQL)

export default withRouter(DetailPageWithDelete)
