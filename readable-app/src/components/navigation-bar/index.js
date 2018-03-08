import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap/lib';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap/lib';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import logo from 'img/logo.svg';

class NavigationBar extends Component {
  render() {
    return (
      <div>
        {/* <Breadcrumb>
          <Breadcrumb.Item></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/404">404</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/sxdfvgzbjhi">bullshit</Link></Breadcrumb.Item>
        </Breadcrumb> */}
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
              <NavItem eventKey={2}>
              <Link to="/404">404</Link>
              </NavItem>
              <NavItem eventKey={2}>
              <Link to="/aöfdklja">aöfdklja</Link>
              </NavItem>
              <NavDropdown eventKey={3} title="dropdowntest" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
    );
  }
}

export default NavigationBar;