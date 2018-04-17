export const actionDefinition = {
  fetchCommentsByPostId: "FETCH_FETCHCOMMENTBYPOSTID_FULFILLED",
  fetchCommentsByID: "FETCH_FETCHCOMMENTBYPOSTID_FULFILLED",
  voteOnComment: "VOTE_ON_COMMENT",
  toggleEditMode: "TOGGLE_EDIT_MODE",
  editComment: "PUT_EDITCOMMENT_FULFILLED",
  updateComment: "UPDATE_COMMENT",
  createEmptyComment: "CREATE_EMPTY_COMMENT",
  createComment: "PUT_CREATECOMMENT_FULFILLED",
  deleteComment: "PUT_DELETECOMMENT_FULFILLED"
}

export function fetchCommentByPostId(data) {
  return {
    type: actionDefinition.fetchCommentsByPostId,
    payload: data
  }
}

export function fetchCommentById(data) {
  return {
    type: actionDefinition.fetchCommentsByID,
    payload: data
  }
}

export function toggleEditModeOnComment(commentId) {
  return {
    type: actionDefinition.toggleEditMode,
    payload: commentId
  }
}

export function voteOnComment(commentIdAndVoteScore) {
  return {
    type: actionDefinition.voteOnComment,
    payload: commentIdAndVoteScore
  }
}

export function editComment(comment) {
  return {
    type: actionDefinition.editComment,
    payload: comment
  }
}

export function updateComment(comment) {
  return {
    type: actionDefinition.updateComment,
    payload: comment
  }
}

export function createComment(comment) {
  return {
    type: actionDefinition.createComment,
    payload: comment
  }
}

export function createEmptyComment(postId) {
  return {
    type: actionDefinition.createEmptyComment,
    payload: postId
  }
}

export function deleteComment(comment) {
  return {
    type: actionDefinition.deleteComment,
    payload: comment.id
  }
}
