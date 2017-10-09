const fromEvent = require('graphcool-lib').fromEvent
const bcrypt = require('bcrypt')
const validator = require('validator')

function getGraphcoolUser(api, email) {
  if (!email) {
    return Promise.resolve(null)
  }
  return api
    .request(
      `query ($email: String) {
        EmailUser(email: $email) {
          id
        }
      }`,
      { email },
    )
    .then(userQueryResult => {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.error)
      } else {
        return userQueryResult.EmailUser
      }
    })
}

function createGraphcoolUser(api, email, passwordHash, name) {
  return api
    .request(
      `mutation ($email: String, $password: String, $name: String) {
        createEmailUser(
          email: $email,
          password: $password,
          name: $name
        ) {
          id
        }
      }`,
      {
        email,
        password: passwordHash,
        name
      },
    )
    .then(userMutationResult => {
      return userMutationResult.createEmailUser.id
    })
}

module.exports = function(event) {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!')
    return { error: 'Email Signup not configured correctly.' }
  }

  const { email, password, name } = event.data
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const SALT_ROUNDS = 10

  if (!email || validator.isEmail(email)) {
    return getGraphcoolUser(api, email)
      .then(graphcoolUser => {
        if (graphcoolUser === null) {
          function getHash(password) {
            if (password) {
              return bcrypt
                .hash(password, SALT_ROUNDS)
            }
            return Promise.resolve(null)
          }
          return getHash(password)
            .then(hash => createGraphcoolUser(api, email || null, hash, name))
        } else {
          const error = new Error(`Email ${email} already in use`)
          error.code = 100
          throw error
        }
      })
      .then(graphcoolUserId => {
        return graphcool
          .generateAuthToken(graphcoolUserId, 'EmailUser')
          .then(token => {
            return { data: { id: graphcoolUserId, token } }
          })
      })
      .catch(error => {
        throw error
        if (error.code === 100) {
          return { error: error.message }
        }

        // don't expose error message to client!
        // return { error: 'An unexpected error occured.' }
        return {error: error.message || error}
      })
  } else {
    return { error: 'Not a valid email' }
  }
}
