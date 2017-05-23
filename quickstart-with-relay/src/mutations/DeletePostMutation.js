import Relay from 'react-relay/classic'

export default class DeletePostMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{deletePost}`
  }

  getFatQuery () {
    return Relay.QL`
    fragment on DeletePostPayload {
      viewer
      deletedId
    }
    `
  }

  getConfigs () {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'post',
      deletedIDFieldName: 'deletedId',
    }]
  }

  getVariables () {
    return {
      id: this.props.postId,
    }
  }

  getOptimisticResponse () {
    return {
      deletedId: this.props.postId,
    }
  }
}

