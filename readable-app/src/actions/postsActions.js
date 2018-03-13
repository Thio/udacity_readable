import Rx from 'rxjs/Rx';

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

export function fetchAllPostsAjax(){
  const a = Rx.Observable
      .ajax({
        url: 'http://localhost:3001/posts',
        method: 'GET',
        headers: {
          'Authorization': 'whatever-you-want'
        }
      }).map(e => e.response);

  return a;
}