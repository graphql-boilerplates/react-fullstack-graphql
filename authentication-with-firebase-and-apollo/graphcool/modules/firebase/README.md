# firebase

Add Firebase Authentication to your Graphcool project 🎁

## Getting Started

```sh
npm -g install graphcool
graphcool init
graphcool module add graphcool/modules/authentication/firebase
```

## Flow

1. The user clicks the `Login with Firebase` button
2. The Firebase Auth UI is loaded and the user accepts
3. The app receives a [Firebase Id Token](https://firebase.google.com/docs/auth/admin/verify-id-tokens)
4. Your app calls the Graphcool mutation `authenticateFirebaseUser(firebaseIdToken: String!)`
5. If no user exists yet that corresponds to the passed `firebaseIdToken`, a new `FirebaseUser` node will be created
6. In any case, the `authenticateFirebaseUser(firebaseIdToken: String!)` mutation returns a valid token for the user
7. Your app stores the token and uses it in its `Authorization` header for all further requests to Graphcool

## Setup

### Create a Firebase App

### Paste Firebase Admin Credentials


## TODO

- [ ] add setup info in README
- [ ] remove logs from function
