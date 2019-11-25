import React from 'react';
import { Route } from 'react-router-dom';
import auth from '../services/Auth';
import PropTypes from 'prop-types';

function GuardedRoute(props) {
  const { component: Component, path } = props;
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (!auth.isAuthenticated()) return auth.login();
        return <Component {...props} />;
      }}
    />
  );
}

GuardedRoute.propTypes = {
  component: PropTypes.element,
  path: PropTypes.string
};

export default GuardedRoute;
