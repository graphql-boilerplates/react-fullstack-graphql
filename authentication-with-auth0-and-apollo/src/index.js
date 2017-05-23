import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import 'tachyons'

const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })

// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/create' component={CreatePost} />
        <Route path='/signup' component={CreateUser} />
      </div>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
