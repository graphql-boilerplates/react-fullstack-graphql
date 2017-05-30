import Relay from 'react-relay/classic'

export default class AddPostMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{createPost}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreatePostPayload {
        viewer
      }
    `
  }

  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'allPosts',
      edgeName: 'edge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }

  getVariables () {
    return {
      description: this.props.description,
      imageUrl: this.props.imageUrl,
    }
  }
}
