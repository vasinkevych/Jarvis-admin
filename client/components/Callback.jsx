import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

import auth from '../services/Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return (
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
}

export default withRouter(Callback);
