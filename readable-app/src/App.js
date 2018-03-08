import * as React from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/bootstrap.min.css';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap/lib';
import PropTypes from 'prop-types';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import NotFound from './components/NotFound'
import FirstGlance from './components/firstGlance'



class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>
        <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/category">
              Library
          </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>

          <Switch>
          <Route
            exact path='/'
            render={(props) =>(
                <FirstGlance/>
              )}
          />
          <Route
          path='/404'
          render={(props) =>(
            <NotFound/>
          )}/>
          <Redirect from='*' to='/404' />
        </Switch>


      </div>
    );
  }
}

export default App;
