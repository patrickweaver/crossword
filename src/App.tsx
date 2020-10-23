import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import Editor from './Editor';
import Game from './Game';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/editor" />
        </Route>
        <Route path="/editor">
          <Editor />
        </Route>
        <Route path="/play">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
