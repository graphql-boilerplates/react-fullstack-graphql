# Quickstart with Relay Modern

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Relay](https://facebook.github.io/relay/): Powerful GraphQL client developed by Facebook
* [Graphcool](https://www.graph.cool): Backend development framework based on GraphQL + Serverless

## Example 

![](http://imgur.com/3S6fUeI.gif)

## Quickstart

<!--
For more information on how to get started [refer to the full react-relay-instagram tutorial](https://www.graph.cool/docs/quickstart/react-relay-instagram/).
--> 

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react-graphql.git
cd react-graphql/quickstart-with-relay-modern
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
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



### 3. Connect the app with your GraphQL API

Copy the `Relay API` endpoint to `./src/createRelayEnvironment.js` as the argument for the call to `fetch` replacing `__RELAY_API_ENDPOINT__ `:

```js
// replace `__RELAY_API_ENDPOINT__ ` with the endpoint from the previous step
return fetch('__RELAY_API_ENDPOINT__', {
 ...
})  
```

### 4. Install dependencies & run locally

```sh
yarn install
yarn relay # invoke relay compiler
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
