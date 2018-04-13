import { actionDefinition } from 'actions/postsActions'

const initialPostsReducerState = []

const emptyPost = {
  id: "dummy",
  title: "",
  body: "",
  author: "",
  category: ""
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
      return action.payload.map(post => extendPayloadOfProperties(post))
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
        if (post.id === action.payload.id) {
          post = action.payload
        }
        return post
      })
    case actionDefinition.createEmptyPost:
      const dummy = state.filter(post => post.id === "dummy")[0]
      if (!dummy) {
        let post = Object.assign({}, emptyPost)
        post.id = `${post.id}_${new Date()}`
        post.category = action.payload
        post.editMode = true
        post.timestamp = new Date()
        return state.concat(post)
      }
      return state
    case actionDefinition.createPost:
      return state.map(post => {
        if (post.id === emptyPost.id) {
          post.id = post.id.splice(0,6)
        }
        return post
      })
    default:
      return state
  }
}

function extendPayloadOfProperties(obj) {
  return Object.assign(obj, { "editMode": false })
}
