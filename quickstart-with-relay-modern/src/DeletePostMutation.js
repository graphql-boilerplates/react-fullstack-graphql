import {
  commitMutation,
  graphql,
} from 'react-relay'
import {ConnectionHandler} from 'relay-runtime'
import environment from './createRelayEnvironment'

const mutation = graphql`
  mutation DeletePostMutation($input: DeletePostInput!) {
    deletePost(input: $input) {
      deletedId
    }
  }
`

export default function DeletePostMutation(postId, viewerId) {
  const variables = {
    input: {
      id: postId,
      clientMutationId: ""
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log('DeletePostMutation - onCompleted - environment', environment)
      },
      onError: err => console.error(err),
      // proxyStore: RecordSourceSelectorProxy
      updater: (proxyStore) => {
        console.log('DeletePostMutation - updater - proxyStore', proxyStore)
        const deletePostField = proxyStore.getRootField('deletePost')
        console.log('DeletePostMutation - updater - deletePostField', deletePostField)
        const deletedId = deletePostField.getValue('deletedId')
        const viewerProxy = proxyStore.get(viewerId)
        console.log('DeletePostMutation - updater - viewerProxy', viewerProxy)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'ListPage_allPosts')
        console.log('DeletePostMutation - updater - connection', connection)
        ConnectionHandler.deleteNode(connection, deletedId)
      }
    },
  )
}