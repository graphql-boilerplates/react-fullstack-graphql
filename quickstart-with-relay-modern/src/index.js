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
