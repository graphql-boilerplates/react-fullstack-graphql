# auth0-lock-example
[Auth0 Lock](https://auth0.com/docs/libraries/lock) is the quickest way to integrate Auth0 in your application. This example demonstrates how to use Auth0 Lock to authenticate users for your [Graphcool backend](https://graph.cool/).

## Online Demo

You can try out the Auth0 + Graphcool authentication workflow using the [hosted online demo](https://lokka-auth0.netlify.com). It's a simple read-only Graphcool project with Auth0 enabled.

![](http://i.imgur.com/OhV9Wl2.gif)

## Project setup

In order to enable Auth0 authentication support please go to your project's `User` model and click on "Configure Auth Provider". Enter your Auth0 credentials in the popup and click "Enable" to submit.

## How it works

The app authenticates via Auth0 Lock which returns a Auth0 `tokenId`. Auth0 **Lock** is just a UI component used for the login layover.

*Note: This step is independent from Graphcool.*

To run this example in development mode, the following configurations are necessary in Auth0 client settings:

* Client Type: `Regular Web Application`
* Token Endpoint Authentication Method: `None`
* Allowed Callback URLs: `http://localhost:3000/`

### Authenticate a request

The session `token` can from now on be used to authenticate the `User` against the Graphcool API by setting the following HTTP header on each GraphQL request (for more details see [Authentication](https://graph.cool/docs/reference/platform/authentication) in the docs):

```
Authorization: Bearer REPLACE_WITH_SESSION_TOKEN
```

### Checking if a user exists

To check if a token obtained from Auth0 already is associated with a `User` in your Graphcool project, you can use the you can use the `user` query with the according token in the `Authorization` header of the request: 

```graphql
query {
  user {
    id
  }
}
```

If an id is returned, the request is authenticated and the user already exists. If the returned user is `null`, the request is not authenticated and we have to create a new user. 

### Creating a user

The first time a user signs in with Auth0 Lock, you have to create a user in your Graphcool project. Execute the `createUser` mutation like this:

```graphql
mutation {
  createUser(authProvider: {
    auth0: {
      idToken: "${this.state.auth0IdToken}"
    }
  }) {
    id
  }
}
```

## Code

This example app is built in React using [create-react-app](https://github.com/facebookincubator/create-react-app) and uses [Lokka](https://github.com/kadirahq/lokka) as a GraphQL client. It also contains the GraphiQL component to simulate the GraphQL access depending on the authentication status.

The concepts used in this example should be easily applicable to other frameworks and technologies.

### Development

```
npm install
npm start
```

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
