import React, { Component } from 'react';


class NavigationBar extends Component {
    render() {
        return (
            <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/category">
              Library
          </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        );
    }
}

export default NavigationBar;