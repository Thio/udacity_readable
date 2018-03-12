// redux store
import { createStore, applyMiddleware, compose } from 'redux';

// used middleware
import logger from "redux-logger";
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";

// reducers
import reducer from "reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// get middleware
const middleware = applyMiddleware(thunk, logger, promise());

// create and export store
export default createStore(reducer, composeEnhancers(middleware));