import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Feed from './components/Feed';
import Login from './components/Login';
import Logout from './components/Logout';
import UserFeed from './components/UserFeed';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/user/:username" component={UserFeed} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </HashRouter>
  );
}

export default App;
