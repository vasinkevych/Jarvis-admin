import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchMigrations,
  migrationsUp,
  migrationsDown,
  migrationsDownOne
} from '../reducers/migrationsReducers';

class Migrations extends React.Component {
  componentDidMount() {
    this.props.fetchMigrations();
  }

  render() {
    return <div>Migrations</div>;
  }
}

export default withRouter(
  connect(
    state => ({}),
    {
      fetchMigrations
    }
  )(Migrations)
);
