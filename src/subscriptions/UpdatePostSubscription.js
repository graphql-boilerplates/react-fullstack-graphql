import { graphql, requestSubscription } from 'react-relay'
import environment from '../Environment'

const UpdatePostSubscription = graphql`
  subscription UpdatePostSubscription {
    Post(filter: { mutation_in: [UPDATED] }) {
      mutation
      node {
        id
        ...Post_post
      }
    }
  }
`

export default (updater, onError) => {
  const subscriptionConfig = {
    subscription: UpdatePostSubscription,
    variables: {},
    updater: proxyStore => {
      const postField = proxyStore.getRootField('Post')
      const updatedNode = postField.getLinkedRecord('node')
      const updatedId = updatedNode.getValue('id')
      const description = updatedNode.getValue('description')
      const post = proxyStore.get(updatedId)
      post.setValue(description, 'description')
    },
    error: error => console.log(`An error occurred:`, error)
  }

  requestSubscription(environment, subscriptionConfig)
}
