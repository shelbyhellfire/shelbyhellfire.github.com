import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import Main from './pages/Main';
import About from './pages/About';
import Work from './pages/Work';

class App extends Component {
  render() {
    return (
      <div className="ssportfolio--container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/about" className="btn btn-primary">About</Link>
        <Link to="/work" className="btn btn-primary">Work</Link>
      </header>
        <Router>
          <Switch>
            <Route exact path={"/"} render={() => (
              <Main />
            )}/>
          </Switch>
          <Switch>
            <Route exact path={"/about"} render={() => (
              <About />
            )}/>
          </Switch>
          <Switch>
            <Route exact path={"/work"} render={() => (
              <Work />
            )}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
