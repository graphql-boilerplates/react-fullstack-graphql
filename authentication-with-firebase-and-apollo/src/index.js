import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'tachyons'
import FirebaseLogin from './components/FirebaseLogin'

ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/create' component={CreatePost} />
        <Route exact path='/login' component={FirebaseLogin} />
      </Switch>
    </BrowserRouter>

  ),
  document.getElementById('root')
)
