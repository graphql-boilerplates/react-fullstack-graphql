import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import { Router, Route, browserHistory } from 'react-router'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import 'tachyons'

const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='create' component={CreatePost} />
      <Route path='login' component={LoginUser} />
      <Route path='signup' component={CreateUser} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
