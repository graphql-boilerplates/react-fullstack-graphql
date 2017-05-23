import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './components/ListPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({ 
  uri: 'https://api.graph.cool/simple/v1/cj0sbl2tvob630118pvaotzrl' 
})

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={ListPage} />
        <Route path='/create' component={CreatePage} />
        <Route path='/post/:id' component={DetailPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
