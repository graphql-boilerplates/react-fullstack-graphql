import React from 'react'
import firebase from '../firebase'
import firebaseui from 'firebaseui'
import { withRouter } from 'react-router'
import { gql, graphql } from'react-apollo'

const authUi = new firebaseui.auth.AuthUI(firebase.auth())

class FirebaseUI extends React.Component {

  componentDidMount() {
    const self = this
    const uiConfig = {
      'callbacks': {
        'signInSuccess': async currentUser => {

          const firebaseIdToken = await currentUser.getIdToken()
          const authenticateUserResult = await this.props.authenticateFirebaseUser({
            variables: { firebaseIdToken }
          })

          if (authenticateUserResult.data.authenticateFirebaseUser.token) {
            localStorage.setItem('graphcoolToken', authenticateUserResult.data.authenticateFirebaseUser.token)
          } else {
            console.error(`No token received from Graphcool`)
          }

          self.props.history.replace('/')
          return false
        }
      },
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          // https://github.com/firebase/firebaseui-web#configure-phone-provider
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: ''
          }
        }
      ]
    }
    authUi.start('#firebaseui-auth', uiConfig)
  }

  componentWillUnmount() {
    authUi.reset()
  }

  render() {
    return (
      <div id="firebaseui-auth" />
    )
  }

}

const AUTHENTICATE_FIREBASE_USER = gql`
  mutation AuthenticateFirebaseUserMutation($firebaseIdToken: String!) {
    authenticateFirebaseUser(firebaseIdToken: $firebaseIdToken) {
      token
    }
  }
`

export default graphql(AUTHENTICATE_FIREBASE_USER, {
  name: 'authenticateFirebaseUser'
})(withRouter(FirebaseUI))