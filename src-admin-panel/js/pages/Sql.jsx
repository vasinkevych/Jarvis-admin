import React from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

class Sql extends React.Component {
  render() {
    return <div>Sql</div>;
  }
}

export default withRouter(connect(
  (state) => ({}),
  {}
)(Sql));
