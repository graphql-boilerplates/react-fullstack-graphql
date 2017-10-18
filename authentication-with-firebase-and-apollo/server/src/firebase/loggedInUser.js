const fromEvent = require('graphcool-lib').fromEvent

function getUser(api, userId) {
  return api.request(`
    query {
      User(id: "${userId}"){
        id
      }
    }`)
    .then(userQueryResult => {
      console.log(userQueryResult)
      return userQueryResult.User
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

  return getUser(api, userId)
    .then(user => {
      if (!user) {
        return { error: `No user with id: ${userId}` }
      }
      return { data: user }
    })
    .catch(error => {
      // Log error but don't expose to caller
      console.log(`Error: ${JSON.stringify(error)}`)
      return { error: `An unexpected error occured` }
    })

}