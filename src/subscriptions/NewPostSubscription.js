import { graphql, requestSubscription } from 'react-relay'
import environment from '../Environment'
import { ConnectionHandler } from 'relay-runtime'

const newPostSubscription = graphql`
  subscription NewPostSubscription {
    Post(filter: { mutation_in: [CREATED] }) {
      mutation
      node {
        id
        ...Post_post
      }
    }
  }
`

export default () => {
  const subscriptionConfig = {
    subscription: newPostSubscription,
    variables: {},
    updater: proxyStore => {
      const postField = proxyStore.getRootField('Post')
      const newPost = postField.getLinkedRecord('node')
      const viewerProxy = proxyStore.getRoot().getLinkedRecord('viewer')
      const connection = ConnectionHandler.getConnection(
        viewerProxy,
        'PostList_allPosts'
      )
      if (connection) {
        const edge = ConnectionHandler.createEdge(
          proxyStore,
          connection,
          newPost,
          'allPosts'
        )
        ConnectionHandler.insertEdgeBefore(connection, edge)
      }
    },
    error: error => console.log(`An error occurred:`, error)
  }

  requestSubscription(environment, subscriptionConfig)
}
