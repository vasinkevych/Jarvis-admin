import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from './Header';
import Callback from './Callback';
import GuardedRoute from './GuardedRoute';

import Migrations from '../pages/Migrations.jsx';
import Users from '../pages/Users.jsx';
import Sql from '../pages/Sql.jsx';

import auth from '../services/Auth';

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }
  render() {
    return (
      <div>
        <Header />{' '}
        <Container>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <h1 className="mt-5">Hello</h1>}
            />
            <GuardedRoute path="/migrations" component={Migrations} />
            <GuardedRoute path="/users" component={Users} />
            <GuardedRoute path="/mysql" component={Sql} />
            <Route path="/callback" component={Callback} exact />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
