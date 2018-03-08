import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap/lib';
import { Link, Route, Redirect, Switch } from 'react-router-dom'

class NavigationBar extends Component {
    render() {
        return (
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/404">404</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/sxdfvgzbjhi">bullshit</Link></Breadcrumb.Item>
          </Breadcrumb>
        );
    }
}

export default NavigationBar;