# react-apollo-todo-example

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Example ([Live demo](https://demo-react-apollo-todo-example.netlify.com) & [GraphQL Playground](https://api.graph.cool/simple/v1/cj1nq71xyfabv0199bp3a7hhf))

![](http://imgur.com/1PkNnTx.gif)

## Quickstart

For more information on how to get started [refer to the full react-apollo-todo tutorial](https://www.graph.cool/docs/quickstartrt/react-apollo-todo-example).

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react-apollo-todo-example.git
cd react-apollo-todo-example
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Todo schema
graphcool init --url graph.cool/schema/todo 
```

This creates a GraphQL API for the following schema:

```graphql
type Todo {
  text: String!
  complete: Boolean!
}
```

### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 4. Install depdendencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Advanced GraphQL features](x)
* [Authentication & Permissions](x)
* [Implementing business logic with serverless functions](x)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
