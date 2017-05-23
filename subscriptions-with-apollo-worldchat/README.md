# Subscriptions Example (with React & Apollo)

A realtime chat application that displays the locations of all the chat participants on a map.

![Worldchat](http://i.imgur.com/8cpv7Hi.png)

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Getting Started

Subscriptions allow you to bring realtime functionality into your app. You can learn more about subscriptions in our [docs](https://www.graph.cool/docs/reference/simple-api/subscriptions-aip7oojeiv/).


### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react.git
cd react/subscriptions-with-apollo-worldchat
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/worldchat.graphql 
```

This creates a GraphQL API for the following schema:

```graphql
type Traveller {
  name: String!
  location: Location! @relation(name: "TravellerLocation")
  messages: [Message!]! @relation(name: "MessagesFromTraveller")
}

type Message {
  text: String!
  sentBy: Traveller!  @relation(name: "MessagesFromTraveller")
}

type Location {
  traveller: Traveller! @relation(name: "TravellerLocation")
  latitude: Float!
  longitude: Float!
}
```

### 3. Connect the app with your GraphQL API

#### 3.1. Simple API

Copy the `Simple API` endpoint to `./src/App.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

#### 3.1. Susbcriptions API

Copy the `Susbcriptions API` endpoint to `./src/App.js` as the argument for the constructor of the `SubscriptionClient`:

```js
const wsClient = new SubscriptionClient('__SUBSCRIPTIONS_API_ENDPOINT__')
```

You can obtain the `Susbcriptions API` endpoint by calling `graphcool endpoints` in the same directory where you called `graphcool init --schema https://graphqlbin.com/insta-files.graphql` before or by clicking the **Endpoints** button in the bottom-left of the [Graphcool Console](https://console.graph.cool).

### 4. Install dedendencies & run locally

You're done configuring the example application. 

```sh
yarn install
yarn start # open browser with: http://localhost:3000
```

### 5. Further resources

This app demonstrates how to use the Graphcool subscription API using Apollo Client. You can learn more about these technologies here:

- [**Tutorial:** How to build a Real-Time Chat with GraphQL Subscriptions and Apollo](https://www.graph.cool/docs/tutorials/worldchat-subscriptions-example-ui0eizishe/)
- [**Video:** How to build a Real-Time Chat with GraphQL Subscriptions and Apollo](https://www.youtube.com/watch?v=aSLF9f13o2c)
- [**Docs:** Using GraphQL Subscriptions with Graphcool](https://www.graph.cool/docs/reference/simple-api/generated-subscriptions-aip7oojeiv)
- [**Blog Post**: GraphQL Subscriptions in Apollo Client](https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb#.458zrl2u7)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
