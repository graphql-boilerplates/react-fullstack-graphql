# Email Authentication Example (with React & Apollo)

* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

You can read the **full tutorial** about this example [here](https://www.graph.cool/docs/tutorials/react-apollo-email-oopheesaj9/) or try out the [hosted version](http://apollo-email.netlify.com).

## Getting Started

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react.git
cd react-graphql/authentication-with-email-and-apollo
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


### 3. Configure Email-Password Authentication

In the [Graphcool Console](https://console.graph.cool), select the **Integrations** tab in the left side-menu. Then select **Email-Password Auth** and click **Enable** in the popup.


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
