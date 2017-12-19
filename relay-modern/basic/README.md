❌ This project is currently in a **broken** state: The Relay setup on the frontend is not compatible yet with the API exposed by the backend. PRs are more than welcome. ❌ 

# React & Relay Modern Quickstart

* **Frontend**
  * [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
  * [Relay Modern](https://facebook.github.io/relay/): Powerful and performane-optimized caching GraphQL client
* **Backend**
  * [Graphcool](https://www.graph.cool): Powerful GraphQL database
  * [`graphql-yoga`](https://github.com/graphcool/graphql-yoga/: Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
  * [`graphcool-binding`](https://github.com/graphcool/graphcool-binding): GraphQL binding for Graphcool services

## Example

![](http://imgur.com/3S6fUeI.gif)

## Quickstart

### 1. Install dependencies

You need to install the following CLIs before getting started:

```sh
npm install -g graphcool
npm install -g graphql-cli
npm install -g graphql-cli-create
```

### 2. Create fullstack app

Use the `graphql-cli` to bootstrap the file structure for your app:

```sh
graphql create demo-app
```

> This command creates a new directory called `demo-app`. It also places all the files you need for the React application and the GraphQL server in that directory.

### 3. Start the server

Before running the React app, you need to make sure the GraphQL server is available under the URL specified in [`./src/index.js`](./src/index.js#L14): `http://localhost:4000`.

To do so, navigate into the `server` directory and start the server:

```sh
cd server
yarn start
```

When prompted which cluster you want to deploy to, choose any of the **Local Clusters** options.

> Note that the [`start`](./server/package.json#L4) script does two things in this case:
>
> - [deploy](https://www.graph.cool/docs/1.0/reference/cli/database-service/graphcool-deploy-kee1iedaov) the Graphcool database so it can be accessed by the web server
> - run the Node script in [`./server/src/index.js`](./server/src/index.js#L14) which starts the GraphQL server
>
> You can now test your GraphQL API inside a GraphQL playground. Simply type the `graphcool playground` command and start sending queries and mutations.

### 4. Start the React app

```sh
cd ..
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Documentation](https://www.graph.cool/docs)
* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
