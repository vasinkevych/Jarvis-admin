import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavItem extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const isActive = this.props.location.pathname === this.props.to;
    return (
      <li className={isActive ? 'nav-item active' : 'nav-item'}>
        <Link className={'nav-link'} {...this.props} />
      </li>
    );
  }
}

export default withRouter(NavItem);
