import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from './createRelayEnvironment'

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        description
        imageUrl
      }
    }
  }
`

export default function CreatePostMutation(description, imageUrl, callback) {
  const variables = {
    input: {
      description,
      imageUrl,
      clientMutationId: ""
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log(response, environment)
        callback()
      },
      onError: err => console.error(err),
    },
  )
}