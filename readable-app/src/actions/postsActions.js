export const actionDefinition = {
  fetchAllPosts: "FETCH_ALLPOSTS_FULFILLED",
  fetchPostsForCategory: "FETCH_POSTSFORCATEGORY_FULFILLED",
  voteOnPost: "VOTE_ON_POST",
  toggleEditMode: "TOGGLE_EDIT_MODE"

}

export function fetchAllPostsMock() {
  return {
    type: actionDefinition.fetchAllPosts,
    payload: {
    }
  }
}

export function fetchAllPostsFromService(data) {
  return {
    type: actionDefinition.fetchAllPosts,
    payload: data
  }
}

export function toggleEditModeOnPost(postId) {
  return {
    type: actionDefinition.toggleEditMode,
    payload: postId
  }
}

export function voteOnPost(postIdAndVoteScore) {
  return {
    type: actionDefinition.voteOnPost,
    payload: postIdAndVoteScore
  }
}