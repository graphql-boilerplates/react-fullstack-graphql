# Firebase Authentication Example (with React & Apollo)

This is an authentication example based on the simple [Firebase Authentication](https://github.com/graphcool/templates/tree/master/auth/firebase) template.


## Getting Started

### 1. Download the example

```sh
curl https://codeload.github.com/graphcool-examples/react-graphql/tar.gz/master | tar -xz --strip=1 react-graphql-master/authentication-with-firebase-and-apollo
cd authentication-with-firebase-and-apollo/server
```

### 2. Create your Graphcool service

```sh
# Install latest version of the Graphcool CLI
npm install -g graphcool@next

# Install dependencies and deploy service
yarn install
graphcool deploy
```

When prompted which cluster you want to deploy to, choose any of the `Backend-as-a-Service` options (`shared-eu-west-1`, `shared-ap-northeast-1` or `shared-us-west-2`).

> Note: The service's schema is created based on the type definitions in [`./server/types.graphql`](./server/types.graphql).

### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 4. Connect the app with Firebase

#### 4.1. Create your Firebase app

In the [Firebase Console](https://console.firebase.google.com/u/0/), create a new project:

![](https://imgur.com/OHYmxmb.png)

#### 4.2. Enable Phone Authentication

In the [Firebase Console](https://console.firebase.google.com/u/0/), navigate to the **Authentication**-section of your project. 

Then go to the **SIGN-IN METHOD**-tab and enable the **Phone** authentication provider:

![](https://imgur.com/P68pNzk.png)

#### 4.3. Enter Firebase app data

##### Frontend

Open to the **Overview** page of your Firebase app in the [Firebase Console](https://console.firebase.google.com/u/0/).

Then click **Add Firebase to your web app**.

![](https://imgur.com/xQ3WMtz.png)

From the resulting popup, copy over all the values for `apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket` and `messagingSenderId` into the corresponding fields of the `config` object inside [`./src/firebase.js`](./src/firebase.js#L3).


##### Backend

Navigate to the project settings of your Firebase project by clicking the _Settings_-icon at the top of the side-menu.

Then go to the **SERVICE ACCOUNTS**-tab and click the **GENERATE NEW PRIVATE KEY**-button:

![](https://imgur.com/qgi9Pmx.png)

Once you generated a new private key, the corresponding data (in JSON format) will be downloaded automatically. Use the downloaded JSON object as the value for the `serviceAccount` constant defined in [`./server/firebase/code/authenticateFirebaseUser.js`](./server/firebase/code/authenticateFirebaseUser.js#L5).

### 5. Install dependencies & run locally

```sh
cd ..
yarn install
yarn start 
```

You can now use the app at `http://localhost:3000`.


## Next steps

* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
