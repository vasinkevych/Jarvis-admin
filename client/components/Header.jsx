import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Login from './Login';

import auth from '../services/Auth';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand href="#">ARSS Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={this.props.location.pathname}>
            <Nav.Item>
              <Nav.Link
                href="/users"
                as={Link}
                to="users"
                disabled={!auth.isAuthenticated()}
              >
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/service"
                as={Link}
                to="service"
                disabled={!auth.isAuthenticated()}
              >
                Service
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav.Item>
            <Login />
          </Nav.Item>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header);
