export const actionDefinition = {
  fetchAllPosts: "FETCH_ALLPOSTS_FULFILLED",
  fetchPostsForCategory: "FETCH_POSTSFORCATEGORY_FULFILLED",
  voteOnPost: "VOTE_ON_POST",
  toggleEditMode: "TOGGLE_EDIT_MODE",
  editPost: "PUT_EDITPOST_FULFILLED",
  updatePost: "UPDATE_POST",
  createEmptyPost: "CREATE_EMPTY_POST",
  createPost: "PUT_CREATEPOST_FULFILLED"
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

export function editPost(post) {
  return {
    type: actionDefinition.editPost,
    payload: post
  }
}

export function updatePost(post) {
  return {
    type: actionDefinition.updatePost,
    payload: post
  }
}

export function createPost(post) {
  return {
    type: actionDefinition.createPost,
    payload: post
  }
}

export function createEmptyPost(category) {
  return {
    type: actionDefinition.createEmptyPost,
    payload: category
  }
}
