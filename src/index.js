<<<<<<< HEAD
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// components
import Home from './components/Home';
import CreatePage from './components/CreatePage';

render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/create" component={CreatePage} />
      <Route path="*" render={() => <h1>Not found</h1>} />
    </Switch>
  </Router>
  , document.getElementById('root')
);
registerServiceWorker();
=======
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import PostCreate from './components/PostCreate'
import PostDetail from './components/PostDetail'
import registerServiceWorker from './registerServiceWorker'
import './asserts/index.css'
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/create" component={PostCreate} />
    <Route path="/post(/:id)" component={PostDetail} />
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
>>>>>>> b335659... add page for create new Post and mutation
