import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Migrations from './pages/Migrations.jsx';
import Users from './pages/Users.jsx';
import Sql from './pages/Sql.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import 'bootstrap-css-only/css/bootstrap.min.css';

const app = document.getElementById('app');

const containerStyle = {
  marginTop: '60px',
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <div class="container-fluid" style={containerStyle}>
        <Route path="/migrations" component={Migrations} />
        <Route path="/users" component={Users} />
        <Route path="/sql" component={Sql} />
      </div>
      <Footer />
    </Router>
  </Provider>,
  app
);
