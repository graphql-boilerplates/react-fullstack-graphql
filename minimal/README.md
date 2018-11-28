<h1 align="center"><strong>Boilerplate for a Minimal Fullstack GraphQL App with React</strong></h1>

<br />

![](https://imgur.com/ousyQaC.png)

<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>

## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **Simple Hello World example:** Where it either returns `Hello <name>!` if name argument is provided or else it returns `Hello World!`

![](https://i.imgur.com/Ip2ZXSC.png)

For a fully-fledged **React & Apollo tutorial**, visit [How to GraphQL](https://www.howtographql.com/react-apollo/0-introduction/). You can more learn about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).

## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```

You need to be on `node>=8` version for these boilerpates to work.

## Getting started

```sh
# 1. Bootstrap GraphQL server in directory `my-app`, based on `react-fullstack-minimal` boilerplate
graphql create my-app --boilerplate react-fullstack-minimal

# 2. When prompted, deploy the Prisma service to a _public cluster_

# 3. Navigate into the `server` directory of the new project
cd my-app/server

# 4. Start the server
yarn start # runs server on http://localhost:4000, and opens GraphQL PLayground

# 5. Open a new tab in the terminal and navigate back into my-app;
# then run the app
cd ..
yarn start
```

## Documentation

### Commands

* `yarn start` inside server starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn start` in the root directory will start GraphQL client on `http://localhost:3000`


### Server structure

![](https://i.imgur.com/fMO23xJ.png)


| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>| 
| :--  | :--         |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── index.js` | The entry point for your GraphQL server |

### Frontend React Structure

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>| 
| :--  | :--         |
| `└── public ` (_directory_) | Contains the html file   |
| `　　├── index.html` 
| `└── src ` (_directory_) | Contains the html file   |
| `　　├── `components(_directory_)| Contains React Component
| `　　├── `index.js(file)|(Root file for React application)


## Contributing

The GraphQL boilerplates are maintained by the GraphQL community, with official support from the [Apollo](https://dev-blog.apollodata.com) & [Graphcool](https://blog.graph.cool/) teams.

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the [`#graphql-boilerplate`](https://graphcool.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://graphcool.slack.com/).
