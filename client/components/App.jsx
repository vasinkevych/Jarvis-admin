import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from './Header';

import Migrations from '../pages/Migrations.jsx';
import Users from '../pages/Users.jsx';
import Sql from '../pages/Sql.jsx';

function App() {
  return (
    <Router hashType={'noslash'}>
      <Header />
      <Container>
        <Switch>
          <Redirect to="/migrations" from="/" exact />
          <Route path="/migrations" component={Migrations} />
          <Route path="/users" component={Users} />
          <Route path="/mysql" component={Sql} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
