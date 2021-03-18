import React from 'react';
import './App.css';
import { Route, Switch ,Link, BrowserRouter as Router } from 'react-router-dom';
import Todo from './components/Todo';
import NotFound from './components/404';
import Navbar from 'react-bootstrap/Navbar'
import store from './store';
import { Provider } from 'react-redux';

const configStore = store();

function App() {
  return (
    <Provider store={configStore}>
    <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="javascript:void(0)"><Link to='/'>React-TODO</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
    </Navbar>
    <Switch>
        <Route exact path="/" component={Todo} />
        <Route component={NotFound} />
    </Switch>
  </Router>
  </Provider>
  );
}

export default App;
