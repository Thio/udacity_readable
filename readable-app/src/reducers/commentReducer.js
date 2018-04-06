import { actionDefinition } from 'actions/commentActions'

const initialCommentReducerState = []

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
    // TODO add reducers
    case actionDefinition.fetchCommentsByPostId:
      return action.payload.map(comment => extendPayloadOfProperties(comment));
      break;
    case actionDefinition.fetchCommentsById:
      return [
        ...state.filter((data => data.id !== action.payload.id)),
        extendPayloadOfProperties(action.payload)
      ]
      break;
    case actionDefinition.toggleEditModeOnComment:
      return state.map(comment => {
        if (comment.id === action.payload) {
          comment.editMode = !comment.editMode;
        }
        return comment;
      })
      break;
    case actionDefinition.voteOnComment:
      return state.map(comment => {
        if (comment.id === action.payload.id) {
          console.log(comment, action)
          comment.voteScore = comment.voteScore + action.payload.voteScore
        }
        return comment
      })
      break;
    default:
      return state;
      break;
  }
}

function extendPayloadOfProperties(obj) {
  return Object.assign(obj, { "editMode": false })
}