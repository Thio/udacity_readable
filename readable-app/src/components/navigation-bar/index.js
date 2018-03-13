import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap/lib';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import logo from 'img/logo.svg';

import { LinkContainer } from 'react-router-bootstrap'

class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img src={logo} className="App-logo" alt="logo" />
              <Link to="/">Readable</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer eventKey="404" to="/404">
                <NavItem>
                  404
                </NavItem>
              </LinkContainer>
              <LinkContainer eventKey="aöfdklja" to="/aöfdklja">
                <NavItem>
                  aöfdklja
              </NavItem>
              </LinkContainer>
              <LinkContainer eventKey="Categories" to="/Categories">
                <NavItem>
                  Category
              </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;