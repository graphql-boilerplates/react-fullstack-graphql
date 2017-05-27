# Auth0 Example (with React & Apollo)

* [Auth0](https://auth0.com/): Powerful authentication provider
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

You can read the **full tutorial** about this example [here](https://www.graph.cool/docs/tutorials/react-apollo-auth0-pheiph4ooj/) or try out the [hosted version](http://apollo-auth0.netlify.com).

## Getting Started

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react-graphql.git
cd react-graphql/authentication-with-auth0-and-apollo
```

### 2. Setting up the Graphcool project

#### 2.1. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/insta-auth0.graphql 
```

This creates a GraphQL API for the following schema:

```graphql
type Post {
  description: String!
  imageUrl: String!
}

type User {
  name: String!
  emailAddress: String!
  emailSubscription: Boolean!
}
```

#### 2.2 Setting the permissions

To make our application behave correctly we have to setup permissions for the `Post` type in our project. Select the **Permissions** tab in the side-menu of the [Graphcool Console](https://console.graph.cool).

As we want to restrict the creation of posts only to _authenticated_ users, we have to create the according permission for `CREATE` on the `Post` type.

<img src="http://imgur.com/VwEazGR.png" height=400>

### 3. Auth0 Configuration

In this step we will connect the Graphcool project to your Auth0 account.

#### 3.1 Create new Auth0 client

Go to the [Auth0 website](https://auth0.com/) and log into your Auth0 account. Create a new **Client** and choose **Single Page Application**. Copy your **domain**, the **client id** and the **client secret** from the settings of the new client.

Make sure to add `http://localhost:3000` to the _allowed callback URLs_ as well.

### 3.2 Configure Auth0 with Graphcool

Back in the [console](https://console.graph.cool), open the **Integrations** tab in the side-menu and click on the Auth0 integration.

Now copy over your **domain**, **client id** and **client secret** from the previous step into the corresponding fields:

![](http://imgur.com/xW0rCSM.png)


### 4. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 5. Install depdendencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
