import { combineReducers } from 'redux'

import postsRed from "reducers/postsReducer"
import categoryRed from "reducers/categoryReducer"

export default combineReducers({
  postsRed,
  categoryRed,
})