import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap/lib';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import logo from 'img/logo.svg';

import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'


import * as categoryActions from 'actions/categoryActions'
import * as categoryDs from 'dataServices/categoryDs'
import * as _ from 'lodash'



class NavigationBar extends Component {

  componentDidMount = function () {
    this.props.fetchCategories();
  }

  render() {
    const allTranslation = 'all';
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
              {
                this.props.category.map((categoryObj) => (
                  categoryObj ?
                    <LinkContainer key={categoryObj.name} to={`/Categories/${categoryObj.path}`}>
                      <NavItem key={categoryObj.name}>{_.capitalize(categoryObj.name)}</NavItem>
                    </LinkContainer>
                    :
                    <div></div>
                ))
              }
              <LinkContainer key="allCats" to="/AllCategories">
                <NavItem key="allCats">{_.capitalize(allTranslation)}</NavItem>
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
    fetchCategories: (data) => categoryDs.fetchCategories().subscribe(function (data) {
      dispatch(categoryActions.fetchCategoriesFromService(data));
    }),
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);