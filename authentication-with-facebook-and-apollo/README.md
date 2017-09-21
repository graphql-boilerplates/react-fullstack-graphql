# Facebook Authentication Example (with React & Apollo)

> **Attention**: This example uses the latest beta version of the CLI! Authentication is implemented using a `resolver` function instead of an authentication provider. 

This is an authentication example based on the simple [Facebook Authentication](https://github.com/graphcool/modules/tree/master/authentication/facebook) module.

## Getting Started

### 1. Clone the repository

```sh
git clone git@github.com:graphcool-examples/graphcool-examples.git
cd graphcool-examples/authentication-with-facebook-and-apollo/graphcool
```

### 2. Create your Graphcool project

```sh
# Install latest version of the Graphcool CLI
npm install -g graphcool@beta

# Create project
graphcool init
```

This will add a `.graphcoolrc` with a default `dev` environment to the project directory. This environment is backed by a new Graphcool project that was created in your Graphcool account.

The project's schema is created based on the type definitions in [`./graphcool/types.graphql`](./graphcool/types.graphql) and [`./graphcool/modules/facebook/types.graphql`](./graphcool/modules/facebook/types.graphql). The Graphcool CLI simply merges all `types.graphql`-files it finds in the project structure to generate the API.


### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 4. Connect the app with Facebook

#### 4.1. Create your Facebook app

Follow the [instructions in the Facebook documentation](https://developers.facebook.com/docs/apps/register) to create your own Facebook app.

Once your app was created, you need to enable _Facebook Login_ and configure it with the right information.

Select **Facebook Login** in the left sidebar (listed under **PRODUCTS**) and add the following URLs to the **Valid OAuth redirects URIs**: `http://localhost:3000`.

![](https://imgur.com/pTkB4sX.png)

#### 4.2. Enter Facebook app data

Open the **Dashboard** in the sidebar of your Facebook app and copy the **App ID** as well as the **API Version** into `App.js`. Set them as the values for the two constants `FACEBOOK_APP_ID` and `FACEBOOK_API_VERSION` which are defined on top of the file.

![](https://imgur.com/L7b8GCn.png)


### 5. Install dependencies & run locally

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
