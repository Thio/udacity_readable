export const actionDefinition = {
  fetchCommentsByPostId: "FETCH_FETCHCOMMENTBYPOSTID_FULFILLED",
  fetchCommentsByID: "FETCH_FETCHCOMMENTBYPOSTID_FULFILLED",
  voteOnComment: "VOTE_ON_COMMENT"

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
    type: actionDefinition.toggleEditModeOnComment,
    payload: commentId
  }
}

export function voteOnComment(commentIdAndVoteScore) {
  return {
    type: actionDefinition.voteOnComment,
    payload: commentIdAndVoteScore
  }
}
