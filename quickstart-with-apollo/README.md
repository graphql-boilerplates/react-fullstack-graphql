# React & Apollo Quickstart

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Backend development framework based on GraphQL + Serverless

## Example

![](http://imgur.com/3S6fUeI.gif)

## Quickstart

<!--
For more information on how to get started [refer to the full react-apollo-instagram tutorial](https://www.graph.cool/docs/quickstart/react-apollo-instagram/) or watch the corresponding [video](https://www.youtube.com/watch?v=OoPQl8hcIug).
-->

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react-graphql.git
cd react-graphql/quickstart-with-apollo
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool Framework CLI
npm install -g graphcool@next

# Create a new service inside a directory called `server`
graphcool init server
```

This created the following file structure:

```
.
└── server
    ├── graphcool.yml
    ├── types.graphql
    ├── .graphcoolrc
    └── src
        ├── hello.graphql
        └── hello.js
```


### 3. Create your GraphQL Server

#### 3.1. Define data model

Next, you need to define your data model inside the newly created `types.graphql`-file.

Replace the current contents in `types.graphql` with the following type definition (you can delete the predefined `User` type):

```graphql
type Post {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  imageUrl: String!
}
```

#### 3.2. Deploy the service

You're now ready to put your Graphcool service into production! Navigate into the `server` directory and _deploy_ the service:

```sh
cd server
graphcool deploy
```

Save the HTTP endpoint for the `GraphQL API` from the output, you'll need it in the next step.

> Note: You can now test your GraphQL API inside a GraphQL playground. Simply type the `graphcool playground` command and start sending queries and mutations.

### 4. Connect the frontend app with your GraphQL API

Copy the `GraphQL API` endpoint from the previous step to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

> **Note**: If you ever lose your endpoint, you can get access to it again with the `graphcool info` command.

### 5. Install dependencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Docs](https://docs-next.graph.cool)
* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)

