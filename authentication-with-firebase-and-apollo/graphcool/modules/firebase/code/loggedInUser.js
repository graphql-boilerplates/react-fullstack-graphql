const fromEvent = require('graphcool-lib').fromEvent

function getFirebaseUser(api, userId) {
  return api.request(`
    query {
      FirebaseUser(id: "${userId}"){
        id
      }
    }`)
    .then(userQueryResult => {
      console.log(userQueryResult)
      return userQueryResult.FirebaseUser
    })
    .catch(error => {
      // Log error but don't expose to caller
      console.log(error)
      return { error: `An unexpected error occured` }
    })
}

module.exports = event => {

  if (!event.context.auth || !event.context.auth.nodeId) {
    console.log(`No auth context`)
    return {data: {id: null}}
  }

  const userId = event.context.auth.nodeId
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getFirebaseUser(api, userId)
    .then(firebaseUser => {
      if (!firebaseUser) {
        return { error: `No user with id: ${userId}` }
      }
      return { data: firebaseUser }
    })
    .catch(error => {
      // Log error but don't expose to caller
      console.log(`Error: ${JSON.stringify(error)}`)
      return { error: `An unexpected error occured` }
    })

}