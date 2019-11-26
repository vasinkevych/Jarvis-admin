import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from './Header';
import Callback from './Callback';
import Policy from '../pages/Policy';
import GuardedRoute from './GuardedRoute';

import Users from '../pages/Users.jsx';
import Service from '../pages/Service.jsx';

import auth from '../services/Auth';
import About from '../pages/About';
import { NotificationContainer } from './NotificationContainer';

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
        <Header />
        <Container>
          <NotificationContainer />
          <Switch>
            <Route
              path="/"
              exact
              render={() => <h1 className="mt-5">Hello</h1>}
            />
            <GuardedRoute path="/users" component={Users} />
            <GuardedRoute path="/service" component={Service} />
            <Route path="/callback" component={Callback} exact />
            <Route path="/policy" component={Policy} exact />
            <Route path="/about" component={About} exact />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
