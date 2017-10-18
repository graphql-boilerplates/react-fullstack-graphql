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
          console.log(`signInSuccess - firebaseIdToken:`, firebaseIdToken)
          const authenticateUserResult = await this.props.authenticateUser({
            variables: { firebaseIdToken }
          })

          console.log(`signInSuccess - currentUser:`, currentUser)
          console.log(`signInSuccess - authenticateUserResult:`, authenticateUserResult)
          if (authenticateUserResult.data.authenticateUser.token) {
            localStorage.setItem('graphcoolToken', authenticateUserResult.data.authenticateUser.token)
          } else {
            console.error(`No token received from Graphcool`)
          }

          self.props.history.replace('/')
          return false
        }
      },
      'signInOptions': [
        {
          // https://github.com/firebase/firebaseui-web#configure-phone-provider
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: ''
          },
         // to also use Google Login, enable the corresponding provider in the Firebase Console
         // firebase.auth.GoogleAuthProvider.PROVIDER_ID,s
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
  mutation AuthenticateUserMutation($firebaseIdToken: String!) {
    authenticateUser(firebaseIdToken: $firebaseIdToken) {
      token
    }
  }
`

export default graphql(AUTHENTICATE_FIREBASE_USER, {
  name: 'authenticateUser'
})(withRouter(FirebaseUI))