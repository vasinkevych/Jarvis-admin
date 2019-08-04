import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand href="#">ARSS Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={this.props.location.pathname}>
            <Nav.Item>
              <Nav.Link href="/migrations" as={Link} to="migrations">
                Migrations
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/users" as={Link} to="users">
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/mysql" as={Link} to="mysql">
                MySQL
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header);
