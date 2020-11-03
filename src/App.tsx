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

  console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL)

  return (
    <Router>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`}>
          <Redirect to={`${process.env.PUBLIC_URL}/editor`} />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/editor`}>
          <Editor />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/play`}>
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
