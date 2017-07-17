import { graphql, requestSubscription } from 'react-relay'
import environment from '../Environment'
import { ConnectionHandler } from 'relay-runtime'

const deletePostSubscription = graphql`
  subscription DeletePostSubscription {
    Post(filter: { mutation_in: [DELETED] }) {
      mutation
      previousValues {
        id
      }
    }
  }
`

export default (updater, onError) => {
  const subscriptionConfig = {
    subscription: deletePostSubscription,
    variables: {},
    updater: proxyStore => {
      const postField = proxyStore.getRootField('Post')
      const deletedNode = postField.getLinkedRecord('previousValues')
      if (deletedNode) {
        const deletedId = deletedNode.getValue('id')
        const viewerProxy = proxyStore.getRoot().getLinkedRecord('viewer')
        const connection = ConnectionHandler.getConnection(
          viewerProxy,
          'PostList_allPosts'
        )
        if (connection) {
          ConnectionHandler.deleteNode(connection, deletedId)
        }
      }
    },
    onError: error => console.log(`An error occurred:`, error)
  }

  requestSubscription(environment, subscriptionConfig)
}
