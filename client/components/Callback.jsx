import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

export default withRouter(Callback);
