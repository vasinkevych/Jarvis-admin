import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Migrations from './pages/Migrations.jsx';
import Users from './pages/Users/index';
import Sql from './pages/Sql.jsx';
import Header from './components/Header';
import Footer from './components/Footer';

import 'bootstrap-css-only/css/bootstrap.min.css';

const app = document.getElementById('app');

const containerStyle = {
  marginTop: '60px'
};

ReactDOM.render(
  <Provider store={store}>
    <Router hashType={'noslash'}>
      <Header />
      <div className="container-fluid" style={containerStyle}>
        <Switch>
          <Redirect to="/users" from="/" exact />
          <Route path="/migrations" component={Migrations} />
          <Route path="/users" component={Users} />
          <Route path="/sql" component={Sql} />
        </Switch>
      </div>
      <Footer />
    </Router>
  </Provider>,
  app
);
