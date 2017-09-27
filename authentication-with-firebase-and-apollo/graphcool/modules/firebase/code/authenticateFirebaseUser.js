const fromEvent = require('graphcool-lib').fromEvent
const firebase = require('firebase')
const admin = require("firebase-admin")

const serviceAccount = {
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}


const getGraphcoolUser = (firebaseUserId, api) => {
  return api.request(`
      query {
        FirebaseUser(firebaseUserId: "${firebaseUserId}"){
          id
        }
      }`
  ).then(userQueryResult => {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.error)
      } else {
        return userQueryResult.FirebaseUser
      }
    }
  )
}

const createGraphcoolUser = (firebaseUserId, api) => {
  return api.request(`
        mutation {
          createFirebaseUser(
            firebaseUserId:"${firebaseUserId}"
          ){
            id
          }
        }`)
    .then(userMutationResult => {
      console.log(`Mutation result: ${JSON.stringify(userMutationResult)}`)
      return userMutationResult.createFirebaseUser.id
    })
}

const getOrCreateGraphcoolUser = (firebaseUserId, api) => {
  return getGraphcoolUser(firebaseUserId, api)
    .then(graphcoolUser => {
      if (!graphcoolUser) {
        console.log('Create Graphcool user...')
        return createGraphcoolUser(firebaseUserId, api)
      } else {
        console.log(`Graphcool user id: ${JSON.stringify(graphcoolUser)}`)
        return graphcoolUser.id
      }
    })
}


module.exports = event => {

  const firebaseIdToken = event.data.firebaseIdToken

  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gc-auth-demo.firebaseio.com"
  })

  return admin.auth().verifyIdToken(firebaseIdToken)
    .then(decodedToken => {
      const firebaseUserId = decodedToken.uid

      return getOrCreateGraphcoolUser(firebaseUserId, api)
        .then(graphcoolUserId => {
          console.log(`Graphcool user: ${graphcoolUserId}`)
          return graphcool.generateAuthToken(graphcoolUserId, 'FirebaseUser')
        })
        .then(token => {
          console.log(`Return token: ${token}`)
          return { data: { token } }
        })
        .catch(error => {
          console.log(`Error: ${JSON.stringify(error)}}`)
          return {
            error: 'An unexpected error occured'
          }
        })

    }).catch(error => {
      console.log(`Firebase ID token not valid`)
      return {
        error: 'Firebase ID token not valid'
      }
    })


}