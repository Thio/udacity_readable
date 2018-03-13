import { combineReducers } from 'redux'

import posts from "reducers/postsReducer"
import category from "reducers/categoryReducer"

export default combineReducers({
  category,
  posts,
})