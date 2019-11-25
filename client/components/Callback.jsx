import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from './Loader';

import auth from '../services/Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return <Loader />;
  }
}

Callback.propTypes = {
  history: PropTypes.object
};

export default withRouter(Callback);
