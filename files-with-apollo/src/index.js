import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './components/ListPage'
import CreatePage from './components/CreatePage'
import { Router, Route, browserHistory } from 'react-router'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'
import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={ListPage} />
      <Route path='/create' component={CreatePage} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
