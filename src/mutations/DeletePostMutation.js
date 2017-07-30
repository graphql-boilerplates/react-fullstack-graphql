import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../Environment'

const mutation = graphql`
  mutation DeletePostMutation($input: DeletePostInput!) {
    deletePost(input: $input) {
      deletedId
    }
  }
`

export default function DeletePostMutation(postId, callback) {
  const variables = {
    input: {
      id: postId,
      clientMutationId: ''
    }
  }
  commitMutation(environment, {
    mutation,
    variables,
    onError: err => console.error(err),
    onCompleted: response => callback && callback(),

    updater: proxyStore => {
      const deletePostField = proxyStore.getRootField('deletePost')
      const deletedId = deletePostField.getValue('deletedId')
      const viewerProxy = proxyStore.getRoot().getLinkedRecord('viewer')
      const connection = ConnectionHandler.getConnection(
        viewerProxy,
        'PostList_allPosts'
      )
      if (connection) {
        ConnectionHandler.deleteNode(connection, deletedId)
      }
    }
  })
}
