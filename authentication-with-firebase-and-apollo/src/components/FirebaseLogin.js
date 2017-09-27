import React from 'react'
import firebase from '../firebase'
import firebaseui from 'firebaseui'
import { withRouter } from 'react-router'

const authUi = new firebaseui.auth.AuthUI(firebase.auth())

class FirebaseUI extends React.Component {

  componentDidMount() {
    const self = this
    const uiConfig = {
      'callbacks': {
        'signInSuccess': async currentUser => {

          const firebaseIdToken = await currentUser.getIdToken()
          // ...

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


export default withRouter(FirebaseUI)