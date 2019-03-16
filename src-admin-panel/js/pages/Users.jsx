import React from "react";
import {connect} from "react-redux";

class Users extends React.Component {
  render() {
    return <div>Users</div>;
  }
}

export default connect(
  (state) => ({}),
  {}
)(Users);
