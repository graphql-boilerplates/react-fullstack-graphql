import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation UpdatePostMutation($input: UpdatePostInput!) {
    updatePost(input: $input) {
      post {
        id
        description
        imageUrl
      }
    }
  }
`

export default function UpdatePostMutation(
  id,
  description,
  imageUrl,
  callback
) {
  const variables = {
    input: {
      id,
      description,
      imageUrl,
      clientMutationId: ''
    }
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: response => callback && callback(),
    onError: err => console.error(err),
    updater: proxyStore => {
      const post = proxyStore.get(id)
      post.setValue(description, 'description')
      post.setValue(imageUrl, 'imageUrl')
    }
  })
}
