import React, { Component } from 'react';
import { Router, Route, hashHistory} from 'react-router';
import './App.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';

injectTapEventPlugin();

function redirectIfLoggedIn(nextState, replace, next) {
  if(localStorage.token) { replace('/search'); }
  next();
}

function redirectIfNotLoggedIn(nextState, replace, next) {
  if(!localStorage.token) { replace('/'); }
  next();
}

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <MuiThemeProvider>
            <div className='row'>
              <Router history={hashHistory}>
                <Route path='/' component={HomePage} onEnter={redirectIfLoggedIn}/>
                <Route path='/search' component={SearchPage} onEnter={redirectIfNotLoggedIn}/>
              </Router>
            </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
