import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Migrations from './pages/Migrations';
import Users from './pages/users';
import Sql from './pages/Sql';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { Auth0Provider } from './providers/auth0-provider';
import Footer from './components/Footer';

import 'bootstrap-css-only/css/bootstrap.min.css';

const app = document.getElementById('app');

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const containerStyle = {
  marginTop: '60px'
};

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      client_id={process.env.AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <Switch>
          {/* <Redirect to="/" exact component={Login} /> */}
          {/* <Route path="/" exact component={Login} /> */}
          <div className="container-fluid" style={containerStyle}>
            <Switch>
              <Header />
              <PrivateRoute path="/migrations" component={Migrations} />
              <PrivateRoute path="/users" component={Users} />
              <PrivateRoute path="/sql" component={Sql} />
              <PrivateRoute path="/profile" component={Profile} />
              <Footer />
            </Switch>
          </div>
        </Switch>
      </Router>
    </Auth0Provider>
  </Provider>,
  app
);
