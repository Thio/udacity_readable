export const actionDefinition = {
  fetchCommentsByPostId: "FETCH_FETCHCOMMENTBYPOSTID_FULFILLED"
}

export function fetchCommentByPostId(data){
     return {
      type: actionDefinition.fetchCommentsByPostId,
      payload:data
    };
}