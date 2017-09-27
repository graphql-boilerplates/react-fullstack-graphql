const fromEvent = require('graphcool-lib').fromEvent
const firebase = require('firebase')
const admin = require("firebase-admin")

const serviceAccount = {
  "type": "service_account",
  "project_id": "gc-auth-demo",
  "private_key_id": "f5f23a1c22950b9939d4237ffd3ad9661b9da926",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQhYS+EvEkO923\n90i9v2IU8YZPcO5O4SVNYmuapoy/9o4Fv35g6bfk7b78pDlwbNuDTLbAZnpMjrgN\ndwPSMxvHl+ls5gKEEM5OH7zqaH8UnB0pQkHE8Ujh6dTVoILjN/ubDubF8jKrpl+5\njBwW3pGLJmZG6+G0eTNiuGDUMMDkPpVz0qwxgBhZr6cuDmkBpx8f6YqSIL+21jEH\nt6qmI6A3jfw80QHbItIqeGUhGg0hgRWTLotRNOYEaJLzgpIuFwkR1j4KENIma3wL\nr/9b/hPFR50tHEzjIosTexL94OLgPspUm8rZcK7ctdyaWMvapayrKrKCfDw5Wkm/\n5g2TvfRNAgMBAAECgf8VxrM+dWzNbHC+hTOk3vPtM/KlZIl6fyZwV+2cbh1CcLmD\n4dbPBeO0ZtwPsJwmdbvgJJdR6xWVc4z8QYWY+/4I6m3nqikMOIWILRCtvKjRplV8\nKSWQb5t9i1q6r872GHSmVZ03XEvw8BwKm6T1NYEz9mEdh4BZrIE8UJVi8eK2bmq/\ngZHQZ3i2l4gTKFLvoaiz2/z3ZcZUUfsguaycwXt4DJ8Lu0BAArtAXvSWvVyjt7vE\nK08CszYc3VBxtOTEFdIWuwsC5gbmujSGD1OrY1kYmFXrwHc230WlTN1gd4atilaK\ni+hPUJ/RLIuoqSGpMgeFCIen1WhEusfKfSxXkG8CgYEAwpm/yn+cusPO4Fsk5hrw\nt/1qg+7PSdX0PLtQH3ZyZ2CROEdY2vUpUGV1eW4UiQUX9H6OhkkSpx4nVcfWzl3h\ngPMVnn5kDvmF0G+ypdH2svrEixLz/Zmqem0tamsx84/JJsdjpqVTguBfwP/xtrUw\nF7IaVh5YIDNErwflLrNAxscCgYEAvh7LFt/nXobU848LvAsEjPupRELc8vWDmNZH\n64LeMJa/NWDgvHeYSw9seHDV6ZFAbp0TSz5l161XG6jj5oe3OwNfw4wQDpzEw6Ec\n8aRBRT5qVFyuKaiQPl9m6AsDZZDo0B1JUcUC8Jv4Q4x/lE1xvPZvhmXoNWainUk0\nHJaGiEsCgYEAjBSxAsupvqeFG+uAPEPYVBmPuzkE7lmdXrpXis5wvAm/f4ucYsFn\n4/+k+KxNC/UmsVEIt5GSY8pI9m7MKfFaisBxJ45D6KOlt80wBD2IIH5zTMlv6XXc\nShSdRKW1Z2ZxngCZszP/UY7CXuPe027KF8SVQLjHJybAol5Ek8FlN7ECgYEAoY31\nMejt6OtWRelGJXKPWWX4viK7MlHik5ty3fQE7vEKZkd+cWiHJzFiES6A98sQH26m\nmIfbbtzDaqOnlZu53hHN7JM2idQ5d6uOtt/G/xo8rJdc/9VXTUkwXvoM1t++lips\nxWlOSDuhSXU4bEMq5VHcDy7Flaszf8hW2fwnMeUCgYEAnVYy07gcAhCfrouBQwZN\niOxOVJHAzyCscbBz1XGJpe38Ez4gNlzC9mf3xIthfi2stVW5d5qe61PE+u0VqnJq\nMn3ACVm6PJAQFCMfZMQeIocmG4EAPmEOo6K6hQtvGSIKV2dkVWxWI6NPbAdl5uah\nwMyoYoI4ff5+OmGUi6kKob0=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-gkus9@gc-auth-demo.iam.gserviceaccount.com",
  "client_id": "113776694610646915488",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gkus9%40gc-auth-demo.iam.gserviceaccount.com"
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