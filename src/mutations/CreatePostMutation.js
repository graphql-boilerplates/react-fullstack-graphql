import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'
import { ConnectionHandler } from 'relay-runtime'

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        ...Post_post
      }
    }
  }
`

let nextClientMutationId = 0

export default function CreatePostMutation(description, imageUrl, callback) {
  const clientMutationId = nextClientMutationId++

  const variables = {
    input: {
      description,
      imageUrl,
      clientMutationId: ''
    }
  }

  const sharedUpdater = (proxyStore, newPost) => {
    const viewerProxy = proxyStore.getRoot().getLinkedRecord('viewer')
    const connection = ConnectionHandler.getConnection(
      viewerProxy,
      'PostList_allPosts'
    )
    if (connection) {
      ConnectionHandler.insertEdgeBefore(connection, newPost)
    }
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: response => callback && callback(),
    onError: err => console.error(err),
    optimisticUpdater: proxyStore => {
      const id = `client:newPost:${clientMutationId}`
      const newPost = proxyStore.create(id, 'Post')
      newPost.setValue(id, 'id')
      newPost.setValue(description, 'description')
      newPost.setValue(imageUrl, 'imageUrl')
      sharedUpdater(proxyStore, newPost)
    },
    updater: proxyStore => {
      const createPostField = proxyStore.getRootField('createPost')
      const newPost = createPostField.getLinkedRecord('post')
      sharedUpdater(proxyStore, newPost)
    }
  })
}
