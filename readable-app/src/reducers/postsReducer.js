import { actionDefinition } from 'actions/postsActions'
import * as _ from 'lodash'

const initialPostsReducerState = []

const emptyPost = {
  id: "dummy",
  title: "",
  body: "",
  author: "",
  category: "",
  new: "true",
  voteScore: 0
}

/*
  ____   ___  _   _ _____   __  __ _   _ _____  _  _____ _____   _____ _   _ _____   ____ _____  _  _____ ___
 |  _ \ / _ \| \ | |_   _| |  \/  | | | |_   _|/ \|_   _| ____| |_   _| | | | ____| / ___|_   _|/ \|_   _| ____|
 | | | | | | |  \| | | |   | |\/| | | | | | | / _ \ | | |  _|     | | | |_| |  _|   \___ \ | | / _ \ | | |  _|
 | |_| | |_| | |\  | | |   | |  | | |_| | | |/ ___ \| | | |___    | | |  _  | |___   ___) || |/ ___ \| | | |___ _
 |____/ \___/|_| \_| |_|   |_|  |_|\___/  |_/_/   \_\_| |_____|   |_| |_| |_|_____| |____/ |_/_/   \_\_| |_____( )
                                                                                                               |/
  ____  _____ _____ _   _ ____  _   _      _      _   _ _______        __   ___  ____      _ _____ ____ _____
 |  _ \| ____|_   _| | | |  _ \| \ | |    / \    | \ | | ____\ \      / /  / _ \| __ )    | | ____/ ___|_   _|
 | |_) |  _|   | | | | | | |_) |  \| |   / _ \   |  \| |  _|  \ \ /\ / /  | | | |  _ \ _  | |  _|| |     | |
 |  _ <| |___  | | | |_| |  _ <| |\  |  / ___ \  | |\  | |___  \ V  V /   | |_| | |_) | |_| | |__| |___  | |
 |_| \_\_____| |_|  \___/|_| \_\_| \_| /_/   \_\ |_| \_|_____|  \_/\_/     \___/|____/ \___/|_____\____| |_|

*/

export default function postsReducer(state = initialPostsReducerState, action) {
  switch (action.type) {
    case actionDefinition.fetchAllPosts:

      return _.merge(action.payload.map(post => extendPayloadOfProperties(post)), state)
    case actionDefinition.toggleEditMode:
      return state.map(post => {
        if (post.id === action.payload) {
          post.editMode = !post.editMode
        }
        return post
      })
    case actionDefinition.voteOnPost:
      return state.map(post => {
        if (post.id === action.payload.id) {
          post.voteScore = post.voteScore + action.payload.voteScore
        }
        return post
      })
    case actionDefinition.updatePost:
      return state.map(post => {
        var cp = post
        if (post.id === action.payload.id) {
          cp = action.payload
          return cp
        }
        return post
      })
    case actionDefinition.createEmptyPost:
      const dummy = state.filter(post => !!post.new === true)[0]
      if (!dummy) {
        let post = Object.assign({}, emptyPost)
        post.id = `${Date.now()}`
        post.category = action.payload
        post.editMode = true
        post.timestamp = Date.now()
        return state.concat(post)
      }
      return state
    case actionDefinition.createPost:
      return state.map(post => {
        if (post.new) {
          post.new = false
        }
        return post
      })
    case actionDefinition.deletePost:
      return state.filter(post => post.id !== action.payload)
    case actionDefinition.fetchPostById:
      return _.merge(action.payload.map(post => extendPayloadOfProperties(post)), state)
    default:
      return state
  }
}

function extendPayloadOfProperties(obj) {
  const obje = Object.assign(obj, { "editMode": false })
  const object = Object.assign(obje, { "new": false })
  return object
}
