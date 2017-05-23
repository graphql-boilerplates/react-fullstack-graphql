# React & Apollo File Upload Example

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Getting Started

You can learn more about file management with Graphcool in our [documentation](https://www.graph.cool/docs/reference/file-handling/overview-eer4wiang0/).

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react.git
cd react/files-with-apollo
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/insta-files.graphql 
```

This creates a GraphQL API for the following schema:

```graphql
type Post {
  description: String!
  image: File @relation(name: "PostImage")
}

type File {
  post: Post @relation(name: "PostImage")
}
```

### 3. Connect the app with your GraphQL API

#### 3.1. Simple API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

#### 3.2. File API

Copy the endpoint for the `File API` into the call to fetch in `./src/components/CreatePage.js` replacing the current placeholder `__FILE_API_ENDPOINT__` (in the method `onDrop`):

```js
// use the file endpoint
fetch('__FILE_API_ENDPOINT__', {
  method: 'POST',
  body: data
}).then(response => {
  return response.json()
}).then(image => {
  this.setState({
    imageId: image.id,
    imageUrl: image.url,
  })
})
```

You can obtain the `File API` endpoint by calling `graphcool endpoints` in the same directory where you called `graphcool init --schema https://graphqlbin.com/insta-files.graphql` before or by clicking the **Endpoints** button in the bottom-left of the [Graphcool Console](https://console.graph.cool).


### 4. Install depdendencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
