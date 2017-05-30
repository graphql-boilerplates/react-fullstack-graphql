import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CreatePage from './CreatePage'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/create' component={CreatePage} />
  </Router>
  , document.getElementById('root')
)

registerServiceWorker()
