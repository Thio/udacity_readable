// Libary Imports
import * as React from 'react'

import { Route, Redirect, Switch } from 'react-router-dom'

// CSS Imports
import 'css/App.css'
import 'css/bootstrap.min.css'
import 'css/animate.css'

// Component Imports
import NotFound from 'components/NotFound'
import FirstGlance from 'components/firstGlance'
import CategoryOverview from 'components/categoryOverview'
import NavigationBar from 'components/navigation-bar'

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
            render={() => (
              <FirstGlance />
            )}
          />
          <Route
            path='/404'
            render={() => (
              <NotFound />
            )} />
            <Route
            exact path='/AllCategories'
            render={() => (
              <CategoryOverview />
            )} />
            <Route
            path='/Categories/'
            render={() => (
              <CategoryOverview />
            )} />
          <Redirect from='*' to='/404' />
        </Switch>

        {/* Footer */}

      </div>
    )
  }
}

export default App
