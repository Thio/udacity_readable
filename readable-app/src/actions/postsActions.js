export const actionDefinition = {
  fetchAllPosts: "FETCH_ALLPOSTS_FULFILLED",
  fetchPostsForCategory: "FETCH_POSTSFORCATEGORY_FULFILLED"
}

export function fetchAllPostsMock(){
  return {
    type: actionDefinition.fetchAllPosts,
    payload: {
      }
  }
}

export function fetchAllPostsFromService(data){
     return {
      type: actionDefinition.fetchAllPosts,
      payload:data
    };
}