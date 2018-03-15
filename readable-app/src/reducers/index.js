import { combineReducers } from 'redux'

import posts from "reducers/postsReducer"
import category from "reducers/categoryReducer"
import comment from "reducers/commentReducer"

export default combineReducers({
  category,
  posts,
  comment,
})