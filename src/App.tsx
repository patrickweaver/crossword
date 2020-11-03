import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import './App.css';

import Editor from './Editor';
import Game from './Game';
import Footer from './Footer';

function App() {

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
      <Footer />
    </Router>
  );
}

export default App;
