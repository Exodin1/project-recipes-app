import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Main from './pages/Main';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Main } />
          <Route exact path="/bebidas" component={ Main } />
          <Route exact path="/perfil" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
