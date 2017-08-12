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

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/instagram.graphql
```

This creates a GraphQL API for the following schema:

```graphql
type Post {
  description: String!
  imageUrl: String!
}
```

### 3. Connect the app with your GraphQL API

#### 3.1. Simple API

Copy the `Simple API` endpoint to `.env` as the `REACT_APP_GRAPHQL_URI`:

```
REACT_APP_GRAPHQL_URI=https://api.graph.cool/simple/v1/__PROJECT_ID_
```

#### 3.1. Subscriptions API

Copy the `Subscriptions API` endpoint to `.env` as `REACT_APP_SUBSCRIPTIONS_URI`:

```
REACT_APP_SUBSCRIPTIONS_URI=wss://subscriptions.graph.cool/v1/__PROJECT_ID_
```

You can obtain the `Susbcriptions API` endpoint by calling `graphcool endpoints` in the same directory where you called `graphcool init --schema https://graphqlbin.com/insta-files.graphql` before or by clicking the **Endpoints** button in the bottom-left of the [Graphcool Console](https://console.graph.cool).

### 4. Install dependencies & run locally

You're done configuring the example application. Please run the following command and open [localhost:3000](http://localhost:3000) in your browser.

```sh
yarn install
yarn start
```

Make sure to open two or more tabs with the page to see subscriptions in action. Have fun exploring! 🎉

### 5. Subscriptions Debugger

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
