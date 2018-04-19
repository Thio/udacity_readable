// Libary Imports
import * as React from 'react'

import { Route, Redirect, Switch } from 'react-router-dom'

// CSS Imports
import 'css/App.css'
import 'css/bootstrap.min.css'
import 'css/animate.css'

// Component Imports
import NotFound from 'components/NotFound'
import PropTypes from 'prop-types'
import FirstGlance from 'components/firstGlance'
import CategoryOverview from 'components/categoryOverview'
import NavigationBar from 'components/navigation-bar'
import SingleCategoryDisplay from 'components/SingleCategoryDisplay'
import Post from 'components/post'

class App extends React.Component {
  static propTypes = {
    location: PropTypes.object
  }
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
              <CategoryOverview />
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
            path='/:category'
            exact
            component={props => <SingleCategoryDisplay {...props} />}
          />
          <Route
            path='/:category/:postId'
            exact
            component={props => <Post {...props} />}
          />
          <Redirect from='*' to='/404' />
        </Switch>

        {/* Footer */}

      </div>
    )
  }
}

export default App
