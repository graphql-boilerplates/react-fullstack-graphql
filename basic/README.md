# react-fullstack-apollo-basic

🚀 Basic starter code for a fullstack app based on React, GraphQL & Apollo Client.

![](https://imgur.com/LG6r1q1.png)

## Technologies

* **Frontend**
  * [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
  * [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* **Backend**
  * [Graphcool](https://www.graph.cool): Powerful GraphQL database
  * [`graphql-yoga`](https://github.com/graphcool/graphql-yoga/): Fully-featured GraphQL server with focus on easy setup, performance & great developer experience
  * [`graphcool-binding`](https://github.com/graphcool/graphcool-binding): GraphQL binding for Graphcool services

## Requirements

You need to have the following things installed:

* Node 8+
* Graphcool CLI: `npm i -g graphcool@beta`
* GraphQL CLI: `npm i -g graphql-cli`
* GraphQL Playground desktop app (optional): [Download](https://github.com/graphcool/graphql-playground/releases)
* Docker, Docker-compose & Docker-machine

## Preview

![](http://imgur.com/3S6fUeI.gif)

## Getting started

```sh
# Bootstrap GraphQL server in directory `my-app`, based on `react-fullstack-basic` boilerplate
graphql create my-app --boilerplate react-fullstack-basic

# Navigate into the new project's `server` directory
cd my-app/server

# Deploy the Graphcool database & start the server (runs on http://localhost:4000)
yarn start

# Navigate back into the project's root directory and launch the React app
cd ..
yarn start # open http://localhost:3000 in your browser
```

<details>

<summary>Alternative: Clone repo</summary>

```sh
TODO
```

</details>

## Docs

### Project structure

#### `/server`

- [`.graphqlconfig.yml`](./server/.graphqlconfig.yml) GraphQL configuration file containing the endpoints and schema configuration. Used by the [`graphql-cli`](https://github.com/graphcool/graphql-cli) and the [GraphQL Playground](https://github.com/graphcool/graphql-playground). See [`graphql-config`](https://github.com/graphcool/graphql-config) for more information.
- [`graphcool.yml`](./server/graphcool.yml): The root configuration file for your database service ([documentation](https://www.graph.cool/docs/1.0/reference/graphcool.yml/overview-and-example-foatho8aip)).

#### `/server/database`

- [`database/datamodel.graphql`](./server/database/datamodel.graphql) contains the data model that you define for the project (written in [SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)).
- [`database/schema.generated.graphql`](./server/database/schema.generated.graphql) defines the **database schema**. It contains the definition of the CRUD API for the types in your data model and is generated based on your `datamodel.graphql`. **You should never edit this file manually**, but introduce changes only by altering `datamodel.graphql` and run `graphcool deploy`.

#### `/server/src`

- [`src/schema.graphql`](src/schema.graphql) defines your **application schema**. It contains the GraphQL API that you want to expose to your client applications.
- [`src/index.js`](src/index.js) is the entry point of your server, pulling everything together and starting the `GraphQLServer` from [`graphql-yoga`](https://github.com/graphcool/graphql-yoga).

### Common questions

#### I'm getting a 'Schema could not be fetched.' error after deploying, what gives?

Access to the Graphcool API is secured by a secret. This also applies to the introspection query. Using the latest version of GraphQL Playground, the `Authorization` header should automatically be setup with a proper JWT signing the secret. If that's not the case, you can follow these steps to access your API:

1. Visit http://jwtbuilder.jamiekurtz.com/
1. Replace the `Key` at the bottom of the page with your `secret` from the [`graphcool.yml`](./server/graphcool.yml#L5)
1. Click `Create signed JWT` and copy the obtained token
1. Now, to access the schema, use the `Authorization: Bearer <token>` header, or in the GraphQL Playground set it as JSON:
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```
1. Reload the schema in the Playground (the _refresh_-button is located right next to the URL of the server)

> Note: Currently, no content of the signed JWT is verified by the database! This will be implemented [according to this proposal](https://github.com/graphcool/framework/issues/1365) at a later stage.

## Contributing

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions, join the [`#graphql-boilerplate`](https://graphcool.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://graphcool.slack.com/).
