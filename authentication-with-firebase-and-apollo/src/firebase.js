import firebase from 'firebase'

export const config = {
  apiKey: "AIzaSyB1b5wUTCEIF8Cl6zd-O4CBc4cIzNQQaTo",
  authDomain: "authdemo-530c5.firebaseapp.com",
  databaseURL: "https://authdemo-530c5.firebaseio.com",
  projectId: "authdemo-530c5",
  storageBucket: "authdemo-530c5.appspot.com",
  messagingSenderId: "428600433491"
}

firebase.initializeApp(config)
export default firebase
