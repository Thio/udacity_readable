import Rx from 'rxjs/Rx'

const header = {
  'Authorization': '1337',
  'Content-Type': 'application/json'
}

export function fetchCommentByPostId(postId) {
  let a = fetch(`http://localhost:3001/posts/${postId}/comments`, {
    method: 'GET',
    headers: header
  }).then(res => res.json())

  return a
}

export function fetchCommentsById(commentId) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/comments/${commentId}`,
    method: 'GET',
    headers: header
  }).map(e => e.response)
  return a
}

export function addComment(post, comment) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/comments`,
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: post
    })
  }).map(e => e.response)
  return a
}

export function voteOnComment(id, voteType) {
  console.log(id, voteType)
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/comments/${id}`,
    method: 'POST',
    headers: header,
    body: {
      option: voteType
    }
  }).map(e => e.response)
  return a
}

export function editComment(id, timestamp, commentBody) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/comments/${id}`,
    method: 'PUT',
    headers: header,
    body: JSON.stringify({
      timestamp: timestamp,
      body: commentBody
    })
  }).map(e => {
    return e.response
  })
  return a
}

export function deleteComment(id) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/comments/${id}`,
    method: 'DELETE',
    headers: header
  }).map(e => e.response)
  return a
}
