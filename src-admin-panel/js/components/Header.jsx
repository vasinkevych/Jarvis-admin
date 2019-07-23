import React from 'react';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? 'collapse' : '';

    return (
      <nav
        className="navbar navbar-expand-lg navbar-toggleable-md navbar-light bg-light"
        role="navigation"
      >
        <div className="container">
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            onClick={this.toggleCollapse.bind(this)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link className="navbar-brand" href="#">
            ARSS Admin Panel
          </Link>

          <div
            className={'navbar-collapse ' + navClass}
            id="bs-example-navbar-collapse-1"
          >
            <ul className="navbar-nav mr-auto">
              <NavItem to="migrations">Migrations</NavItem>
              <NavItem to="users">Users</NavItem>
              <NavItem to="sql">mySQL</NavItem>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
