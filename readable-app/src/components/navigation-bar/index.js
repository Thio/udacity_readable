import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap/lib';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import logo from 'img/logo.svg';

import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import * as categoryActions from 'actions/categoryActions'
import * as postsActions from 'actions/postsActions'

class NavigationBar extends Component {

  componentDidMount = function () {
    this.props.fetchCategories();
  }

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
            <Navbar.Text>
              Categories:
          </Navbar.Text>
            <Nav>
              {/* {
                this.props.category.count > 5 ? (
                  <NavDropdown eventKey="Categories" title="Categories" id="basic-nav-dropdown">
                    {
                      this.props.category.map((categoryObj) => (
                      <LinkContainer eventKey={`/Categories${categoryObj.path}`} to={`/Categories/${categoryObj.path}`}>
                        <MenuItem eventKey={categoryObj.name}>{categoryObj.name}</MenuItem>
                      </LinkContainer>
                    ))}
                    < MenuItem eventKey="divider" divider />
                    <LinkContainer eventKey="Categories" to="/AllCategories">
                      <MenuItem eventKey={3.4}>ALL</MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                )
                : (
                  this.props.category.map((categoryObj) => (
                    categoryObj ?
                    <LinkContainer eventKey={`/Categories${categoryObj.path}`} to={`/Categories/${categoryObj.path}`}>
                      <NavItem key={categoryObj.name} eventKey={categoryObj.name}>{categoryObj.name}</NavItem>
                    </LinkContainer>
                    :
                    <div></div>
                  ))
                  <LinkContainer eventKey="Categories" to="/AllCategories">
                    <NavItem eventKey={3.4}>ALL</NavItem>
                  </LinkContainer>
                )
              } */}
              {
                this.props.category.map((categoryObj) => (
                  categoryObj ?
                    <LinkContainer key={categoryObj.name} to={`/Categories/${categoryObj.path}`}>
                      <NavItem key={categoryObj.name}>{categoryObj.name}</NavItem>
                    </LinkContainer>
                    :
                    <div></div>
                ))
              }
              <LinkContainer key="allCats" to="/AllCategories">
                <NavItem key="allCats">ALL</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (data) => categoryActions.fetchCategoriesAjax().subscribe(function (data) {
      dispatch(categoryActions.fetchCategoriesFromService(data))
    }),
    fetchPosts: (data) => postsActions.fetchAllPostsAjax().subscribe(function (data) {
      dispatch(categoryActions.fetchAllPostsFromService(data))
    })
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);