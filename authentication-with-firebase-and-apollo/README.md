# Firebase Authentication Example (with React & Apollo)

> **Attention**: This example uses the latest beta version of the CLI! Authentication is implemented using a `resolver` function instead of an authentication provider. 

This is an authentication example based on the simple [Firebase Authentication](https://github.com/graphcool/modules/tree/master/authentication/firebase) module.

## Getting Started

### 1. Clone the repository

```sh
git clone git@github.com:graphcool-examples/graphcool-examples.git
cd graphcool-examples/authentication-with-firebase-and-apollo/graphcool
```

### 2. Create your Graphcool project

```sh
# Install latest version of the Graphcool CLI
npm install -g graphcool@beta

# Create project
graphcool init
```

This will add a `.graphcoolrc` with a default `dev` environment to the project directory. This environment is backed by a new Graphcool project that was created in your Graphcool account.

The project's schema is created based on the type definitions in [`./graphcool/types.graphql`](./graphcool/types.graphql) and [`./graphcool/modules/firebase/types.graphql`](./graphcool/modules/firebase/types.graphql). The Graphcool CLI simply merges all `types.graphql`-files it finds in the project structure to generate the API.


### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 4. Connect the app with Firebase

#### 4.1. Create your Firebase app

...

#### 4.2. Enter Firebase app data

Configure  `serviceAccount` in [`./graphcool/modules/firebase/code/authenticateFirebaseUser.js`](./graphcool/modules/firebase/code/authenticateFirebaseUser.js).


### 5. Install dependencies & run locally

```sh
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
