import React from 'react';
import NavItem from './NavItem.jsx';

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
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
        class="navbar navbar-expand-lg navbar-toggleable-md navbar-light bg-light"
        role="navigation"
      >
        <div class="container">
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            onClick={this.toggleCollapse.bind(this)}
          >
            <span class="navbar-toggler-icon" />
          </button>
          <a class="navbar-brand" href="#">
            ARSS Admin Panel
          </a>

          <div
            class={'navbar-collapse ' + navClass}
            id="bs-example-navbar-collapse-1"
          >
            <ul class="navbar-nav mr-auto">
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
