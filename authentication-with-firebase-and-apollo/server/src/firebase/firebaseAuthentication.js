const fromEvent = require('graphcool-lib').fromEvent
const firebase = require('firebase')
const admin = require("firebase-admin")

const serviceAccount = {
  "type": "service_account",
  "project_id": "authdemo-530c5",
  "private_key_id": "8ba265db29f73994ee11c0d47fd6cb3d8eb452cd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDypOohAr44LRTX\n9W4k3lZRH0TW8Ivn5XHfvdZA60bHEtx/JQkc0wP/jO34LOQ/6uLqI602BHfTz8pT\n3/eA7HMz18fhi8lAKqGW9t2Fz7+Zx1NcrxiswsP3Y4aTeCXOX9j1Apyra4i2jcGe\nAZm9seTZIt3stayz3bi2hAv1Scx32H/B6GbJaJ+z/o45QhmDXbkbQubosqGhnLjd\n8VuHNZF4MfzV3UYq2xNHiKvUva3KXtPXTpgebZp99fYz/3oezGGAlX1NMDpAX6c+\n6bD+ZbG3OSwFzFldy+FAXr+4YrlJy+gDSCsiFu1Enizg4zC63jrL1/wy30Ktrsmz\nFiV58l7BAgMBAAECggEAHnxN1jvr/k7bsY5qekNdAPA2y/KJAWe4eO32/00QJW7f\nOTJEBNUWSYNBWs75FnbCb7xvxLum+nu+5e7bv9z1VGwl9taDQIaaqsb1ahyB7CY4\n+QoexYXq7SgZ/mk4BsfQEGh1mqv2D0mcK+fzkvvIzucsjtL8kdSnonbQsc7F28Cf\nG1M+P5d18Esi+5Tx3jz8/I1ux5azfS9o0vKntxEcfcIF0OT8T9lXQuCAwvlBAxH5\ntumGEZAyh+5MMgKn15iBZLEuwoYRO1e7upbfuK3Fo8gDFed78KKKfXkJ/jakboEu\nZEoxHJNkdAYxcNOsR44PV9V+4Tq+i5/VQBa1GHsE4QKBgQD7Xe1bJj+6Byv6wFTi\nj+JFPYCSJrbW0qu4ZvRyrhBcMae/rN4SnYnnCoLViKrSIttCnz8yEAsnxzPi8QYf\nhs3wkw/Qm2HDYtj54XIxcljSNGnF1vuXprWXimOR099ixGUls94SvRJVFx1Gxlno\nADAkBq6MmYpjrjPL7owJHhMnXQKBgQD3HdRR4Er8sJUKB5KSUhhsC7Kuo9eBz6jf\nD/hJnF5dymkMIgH2RxAor/DkrWMCkdgb+tXZvdoFBbPU8kxuu4z96uSEmMiwZrrg\nSA7Ggn15LLM0QQRPTE6W0KvqM1bL0kT3fdh8S8G3uMTxE/j9Q+dEifB0rN48gczr\nPXu1yP8StQKBgGaPqGzsakwI6RTirL/UXUpLEc6QJUH5qz8OIuc3xk0XpY47hlCq\nHr46N6/Ql4It3rCMMUjH6wVL7gvGs+zhH93s4yMGgxkpl8Y9Ck7KjRsXb6DdWsJB\nrw4p1P6HKDowT+TWQuH6ayR0zek2vTBAA2RvpYCQlTqetVub9V8y+jWxAoGAYN4m\njnnXqzolEitpv0XDIQds4ZyEK/SVA+ukrmZHb4iaqRDjqACvSuO9EEcPWsCE8GLh\nVVtgjTtxBPZ+E6IdYKOlNH0Xnl6GvshAUnxwZwGotcEOyW7mF6Rw33uEeJ1SP5nr\nNL4Vj8k0GjR0FAN8MpfH1FS3QQy4oTYWummx40kCgYEAs0U3TL0tpmw9PvqZEwho\n5GLRixHMsvZflO8hefI9kVcY17F9TgLuu4VbVs3Q+9tb11l9O9NTh1lKhjE6UP9z\nGFkuRD7D3xf3KXyG1GFstAh6PRYl3oMmVDFZc9MYKPkmt469S7G/xLTm5INfTIHE\n0eZ0t4KMgf8v0e/izb5ZUTo=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ie7jv@authdemo-530c5.iam.gserviceaccount.com",
  "client_id": "106967269379484417428",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ie7jv%40authdemo-530c5.iam.gserviceaccount.com"
}


const getGraphcoolUser = (firebaseUserId, api) => {
  return api.request(`
      query {
        User(firebaseUserId: "${firebaseUserId}"){
          id
        }
      }`
  ).then(userQueryResult => {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.error)
      } else {
        return userQueryResult.User
      }
    }
  )
}

const createGraphcoolUser = (firebaseUserId, api) => {
  return api.request(`
        mutation {
          createUser(
            firebaseUserId:"${firebaseUserId}"
          ){
            id
          }
        }`)
    .then(userMutationResult => {
      console.log(`Mutation result: ${JSON.stringify(userMutationResult)}`)
      return userMutationResult.createUser.id
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
          return graphcool.generateAuthToken(graphcoolUserId, 'User')
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