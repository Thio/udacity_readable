import Rx from 'rxjs/Rx'
import { voteTypes, errorString } from 'util/constValues'

export function fetchCommentByPostId(postId) {
  const a = Rx.Observable
    .ajax({
      url: `http://localhost:3001/posts/${postId}/comments`,
      method: 'GET',
      headers: {
        'Authorization': '1337'
      }
    }).map(e => e.response)
  return a;
}

export function fetchCommentsById(commentId) {
    const a = Rx.Observable
      .ajax({
        url: `http://localhost:3001/comments/${commentId}`,
        method: 'GET',
        headers: {
          'Authorization': '1337'
        }
      }).map(e => e.response)
    return a;
}

export function addComment(postId, id, timestamp, body, author) {
  const a = Rx.Observable
    .ajax({
      url: `http://localhost:3001/comments`,
      method: 'POST',
      headers: {
        'Authorization': '1337'
      },
      body: {
        id: id,
        timestamp: timestamp,
        body: body,
        author: author,
        parentId: postId
      }
    }).map(e => e.response)
  return a;
}

export function voteOnComment(id, voteType) {
  if (voteTypes.findKey(voteType)) {
    return Rx.Observable.throw(errorString.voteTypeNotAvailable);
  }

  const a = Rx.Observable
    .ajax({
      url: `http://localhost:3001/comments/${id}`,
      method: 'POST',
      headers: {
        'Authorization': '1337'
      },
      body: {
        option: voteType
      }
    }).debounce(5000).map(e => e.response)
  return a;
}

export function editComment(id, timestamp, commentBody) {
  const a = Rx.Observable
    .ajax({
      url: `http://localhost:3001/comments/${id}`,
      method: 'PUT',
      headers: {
        'Authorization': '1337'
      },
      body: {
        timestamp: timestamp,
        body: commentBody
      }
    }).map(e => e.response)
  return a;
}

export function deleteComment(id) {
  const a = Rx.Observable
    .ajax({
      url: `http://localhost:3001/comments/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': '1337'
      }
    }).map(e => e.response)
  return a;
}
