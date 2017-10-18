# Subscriptions Example (with React & Apollo)

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Getting Started

Subscriptions allow you to bring realtime functionality into your app. You can learn more about subscriptions in our [docs](https://www.graph.cool/docs/reference/simple-api/subscriptions-aip7oojeiv/).


### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react-graphql.git
cd react-graphql/subscriptions-with-apollo-instagram
```

### 2. Create Graphcool service with the [Graphcool CLI](https://docs-next.graph.cool/reference/graphcool-cli/overview-zboghez5go)

```sh
# Install Graphcool Framework CLI
npm install -g graphcool@next

# Create a new service inside a directory called `server`
graphcool init server
```

This created the following file structure in the current directory:

```
.
└── server
    ├── graphcool.yml
    ├── types.graphql
    └── src
        ├── hello.graphql
        └── hello.js
```

### 3. Define data model

Next, you need to define your data model inside the newly created `types.graphql`-file.

Replace the current contents in `types.graphql` with the following type definition (you can delete the predefined `User` type):

```graphql
type Post @model {
  # Required system field
  id: ID! @isUnique # read-only (managed by Graphcool)

  # Optional system fields (remove if not needed)
  createdAt: DateTime! # read-only (managed by Graphcool)
  updatedAt: DateTime! # read-only (managed by Graphcool)

  description: String!
  imageUrl: String!
}
```

### 4. Deploy the GraphQL server

You're now ready to put your Graphcool service into production! Navigate into the `server` directory and [deploy](https://docs-next.graph.cool/reference/graphcool-cli/commands-aiteerae6l#graphcool-deploy) the service:

```sh
cd server
graphcool deploy
```

Save the HTTP endpoint for the `Simple API` from the output as well as the websocket endpoint for the `Subscriptions API`, you'll need them in the next step.

> **Note**: You can now test your GraphQL API inside a GraphQL playground. Simply type the `graphcool playground` command and start sending queries and mutations.

### 5. Connect the app with your GraphQL API

#### 5.1. Simple API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

#### 5.2. Subscriptions API

Copy the `Subscriptions API` endpoint to `./src/index.js` as the argument for the constructor of the `SubscriptionClient`:

```js
const wsClient = new SubscriptionClient('__SUBSCRIPTIONS_API_ENDPOINT__')
```

> **Note**: If you ever lose your endpoints, you can get access to them again with the `graphcool info` command.

### 6. Install dependencies & run locally

You're done configuring the example application. Please run the following command and open [localhost:3000](http://localhost:3000) in your browser. 

```sh
cd ..
yarn install
yarn start
```

Make sure to open two or more tabs with the page to see subscriptions in action. Have fun exploring! 🎉

### 7. Subscriptions Debugger

You can use the Graphcool Playground to test subscriptions.

![](http://graphcool-random.s3.amazonaws.com/images/subscriptions.gif)

Simply run a subscription query to subscribe in one tab:

```graphql
subscription {
  Post(filter: {
    mutation_in: [CREATED]
  }) {
    node {
      id
      imageUrl
      description
    }
  }
}
```

Then, in a different tab you can send a mutation to trigger the mutation:

```graphql
mutation {
  createPost(
    description: "Giraffe",
    imageUrl: "http://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/g/giraffe_thumb.JPG",
  ) {
    id
  }
}
```

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
