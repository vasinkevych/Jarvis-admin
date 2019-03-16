import React from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

class Users extends React.Component {
  render() {
    return <div>Users</div>;
  }
}

export default withRouter(connect(
  (state) => ({}),
  {}
)(Users));
