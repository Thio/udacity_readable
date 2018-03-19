export const actionDefinition = {
  fetchCommentsByPostId: "FETCH_FETCHCOMMENTBYPOSTID_FULFILLED",
  fetchCommentsByID: "FETCH_FETCHCOMMENTBYPOSTID_FULFILLED"
}

export function fetchCommentByPostId(data){
     return {
      type: actionDefinition.fetchCommentsByPostId,
      payload:data
    };
}

export function fetchCommentById(data){
  return {
    type: actionDefinition.fetchCommentsByID,
    payload:data
  };
}