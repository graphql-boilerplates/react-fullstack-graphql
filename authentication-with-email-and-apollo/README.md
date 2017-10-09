# Email Authentication Example (with React & Apollo)

This is an authentication example based on the simple [Email & Password Authentication](https://github.com/graphcool/modules/tree/master/authentication/email-password) template.

## Getting Started

### 1. Clone the repository

```sh
git clone git@github.com:graphcool-examples/react-graphql.git
cd react-graphql/authentication-with-email-and-apollo/graphcool
```

### 2. Create your Graphcool project

```sh
# Install latest version of the Graphcool CLI
npm install -g graphcool@next

# Deploy service
graphcool deploy
```

This will add a `.graphcoolrc` with a default `dev` environment to the service directory. This environment is backed by a new Graphcool service that was created in your Graphcool account.

The service's schema is created based on the type definitions in [`./types.graphql`](./types.graphql). 


#### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

> Note: You can get access to your endpoint using the `graphcool info` command.


### 4. Install dependencies & run locally

```sh
yarn install
yarn start 
```

You can now use the app at `http://localhost:3000`.

## Next steps

* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
