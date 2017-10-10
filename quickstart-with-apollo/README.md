# React & Apollo Quickstart

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Example ([GraphQL Playground](https://api.graph.cool/simple/v1/cj1erhgba0uxi0109k14mdght))

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
└── graphcool
    ├── graphcool.yml
    ├── types.graphql
    ├── .graphcoolrc
    └── code
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

> Note: You can now test your GraphQL API inside a GraphQL playground. Simply type the `graphcool playground` command and start sending queries and mutations.


### 4. Connect the frontend app with your GraphQL API

#### 4.1. Get your API endpoint

You now need access to your GraphQL API's endpoint. Run the following command from inside the `server` directory:

```sh
graphcool info
```

You need to use the endpoint for the `Simple API`.

#### 4.2. Set the endpoint to configure Apollo Client

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 5. Install dependencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
