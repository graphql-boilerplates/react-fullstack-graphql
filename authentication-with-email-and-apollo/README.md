# Email Authentication Example (with React & Apollo)

This is an authentication example based on the simple [Email & Password Authentication](https://github.com/graphcool/templates/tree/master/auth/email-password) template.

## Getting Started

### 1. Download the example

```sh
curl https://codeload.github.com/graphcool-examples/react-graphql/tar.gz/master | tar -xz --strip=1 react-graphql-master/authentication-with-email-and-apollo
cd authentication-with-email-and-apollo/server
```

### 2. Create your Graphcool service

```sh
# Install latest version of the Graphcool CLI
npm install -g graphcool@next

# Install dependencies and deploy service
yarn install
graphcool deploy
```

When prompted which cluster you want to deploy to, choose any of the `Backend-as-a-Service` options (`shared-eu-west-1`, `shared-ap-northeast-1` or `shared-us-west-2`).

> Note: The service's schema is created based on the type definitions in [`./types.graphql`](./types.graphql).


#### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

> Note: You can get access to your endpoint using the `graphcool info` command.


### 4. Install dependencies & run locally

Navigate back into the root directory of the project, install the dependencies and run the app:

```sh
cd ..
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
