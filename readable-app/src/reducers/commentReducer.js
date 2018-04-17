import { actionDefinition } from 'actions/commentActions'

const initialCommentReducerState = []

const emptyComment = {
  id: "dummy",
  parentId: null,
  body: "",
  author: "",
  voteScore: 0,
  new: true
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

export default function commentReducer(state = initialCommentReducerState, action) {
  switch (action.type) {
    case actionDefinition.fetchCommentsByPostId:
      const a = action.payload.filter(item => state.filter(data => data.id === item.id).length === 0)
      return state.concat(a)
    case actionDefinition.fetchCommentsById:
      return [
        ...state.filter((data => data.id !== action.payload.id)),
        extendPayloadOfProperties(action.payload)
      ]
    case actionDefinition.toggleEditMode:
      return state.map(comment => {
        if (comment.id === action.payload) {
          comment.editMode = !comment.editMode
        }
        return comment
      })
    case actionDefinition.voteOnComment:
      return state.map(comment => {
        if (comment.id === action.payload.id) {
          comment.voteScore = comment.voteScore + action.payload.voteScore
        }
        return comment
      })
    case actionDefinition.updateComment:
      return state.map(comment => {
        let c = comment
        if (c.id === action.payload.id) {
          c = action.payload
        }
        return c
      })
    case actionDefinition.createEmptyComment:
      const dummy = state.filter(comment => comment.new)[0]
      if (!dummy) {
        let comment = Object.assign({}, emptyComment)
        comment.id = `${Date.now()}`
        comment.parentId = action.payload
        comment.editMode = true
        comment.timestamp = Date.now()
        return state.concat(comment)
      }
      return state
    case actionDefinition.createComment:
      return state.map(comment => {
        if (comment.new ) {
          comment.new = false,
          comment.editMode = false
        }
        return comment
      })
    case actionDefinition.deleteComment:
      return state.filter(comment => comment.id !== action.payload)
    default:
      return state
  }
}

function extendPayloadOfProperties(obj) {
  const obje = Object.assign(obj, { "editMode": false, "new": false })
  return obje
}
