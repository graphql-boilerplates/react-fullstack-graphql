const fromEvent = require('graphcool-lib').fromEvent

module.exports = function(event) {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!')
    return { error: 'Facebook Authentication not configured correctly.'}
  }

  const facebookToken = event.data.facebookToken
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  function getFacebookAccountData(facebookToken) {
    return fetch(
      `https://graph.facebook.com/v2.9/me?fields=id%2Cemail&access_token=${facebookToken}`)
      .then(response => response.json())
      .then((parsedResponse) => {
      console.log(parsedResponse)
        if (parsedResponse.error) {
          return Promise.reject(parsedResponse.error.message)
        } else {
          return parsedResponse
        }
      })
  }

  function getGraphcoolUser(facebookUser) {
    console.log(`get Graphcool user: ${JSON.stringify(facebookUser)}`)
    return api.request(`
    query {
      FacebookUser(facebookUserId: "${facebookUser.id}") {
        id
      }
    }`)
      .then((userQueryResult) => {
      console.log(`user query result: ${JSON.stringify(userQueryResult)}`)
        if (userQueryResult.error) {
          return Promise.reject(userQueryResult.error)
        } else {
          return userQueryResult.FacebookUser
        }
      })
  }

  function createGraphcoolUser(facebookUser) {
    console.log(`Create new graphcool user from FB user: ${JSON.stringify(facebookUser)}`)
    return api.request(`
      mutation {
        createFacebookUser(
          facebookUserId: "${facebookUser.id}"
          facebookEmail: "${facebookUser.email}"
        ) {
          id
        }
      }`)
      .then((userMutationResult) => {
        return userMutationResult.createFacebookUser.id
      })
  }

  return getFacebookAccountData(facebookToken)
    .then((facebookUser) => {
      return getGraphcoolUser(facebookUser)
        .then((graphcoolUser) => {
          console.log(`checked graphcool user: ${JSON.stringify(graphcoolUser)}`)
          if (!graphcoolUser) {
            return createGraphcoolUser(facebookUser)
          } else {
            return graphcoolUser.id
          }
        })
    })
    .then(graphcoolUserId => graphcool.generateAuthToken(graphcoolUserId, 'FacebookUser'))
    .then((token) => {
      console.log(`generated auth token: ${token}`)
      return {
        data: {
          token: token
        }
      }
    })
    .catch((error) => {
      console.log(error)

      // don't expose error message to client!
      return {
        error: 'An unexpected error occured.'
      }
    })
}
