// Libary Imports
import * as React from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Redirect, Switch } from 'react-router-dom'

// CSS Imports
import 'css/App.css'
import 'css/bootstrap.min.css'
import 'css/animate.css'

// Component Imports
import NotFound from 'components/NotFound'
import FirstGlance from 'components/firstGlance'
import CategoryOverview from 'components/categoryOverview'
import NavigationBar from 'components/navigation-bar'
import Header from 'components/header'


class App extends React.Component {

  render() {

    return (
      <div className="App">
        {/* Header */}
        {/* <Header /> */}
        <NavigationBar />

        {/*  Content */}
        <Switch>
          <Route
            exact path='/'
            render={(props) => (
              <FirstGlance />
            )}
          />
          <Route
            path='/404'
            render={(props) => (
              <NotFound />
            )} />
            <Route
            exact path='/AllCategories'
            render={(props) => (
              <CategoryOverview />
            )} />
            <Route
            path='/Categories/'
            render={(props) => (
              <CategoryOverview />
            )} />
          <Redirect from='*' to='/404' />
        </Switch>

        {/* Footer */}

      </div>
    );
  }
}

export default App;
