import firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyD2I6rKupGrUicg_Vm8-JxQTiOb1RHJi1M',
  authDomain: 'gc-auth-demo.firebaseapp.com',
  databaseURL: 'https://gc-auth-demo.firebaseio.com',
  projectId: 'gc-auth-demo',
  storageBucket: 'gc-auth-demo.appspot.com',
  messagingSenderId: '1084092471083'
}

firebase.initializeApp(config)
export default firebase
