import Rx from 'rxjs/Rx'
import * as _ from 'lodash'
import { errorString } from 'util/constValues'

const AddPostsObjectKeys = ['id', 'timestamp', 'title', 'body', 'author', 'category']

export function fetchAllPosts() {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/posts`,
    method: 'GET',
    headers: {
      'Authorization': '1337'
    }
  }).map(e => e.response)
  return a
}

export function fetchPostsByCategory(category) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/${category}/posts`,
    method: 'GET',
    headers: {
      'Authorization': '1337'
    }
  }).map(e => e.response)
  return a
}

export function addPost(post) {

  if (checkObjectAgainstPropertyArray(post, AddPostsObjectKeys)) {
    return Rx.Observable.throw(errorString.wrongPropertiesString)
  }

  const a = Rx.Observable.ajax({
    url: 'http://localhost:3001/posts',
    method: 'POST',
    headers: {
      'Authorization': '1337'
    },
    body: post
  }).map(e => e.response)
  return a
}

export function fetchPostById(id) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/posts/${id}`,
    method: 'GET',
    headers: {
      'Authorization': '1337'
    }
  }).map(e => e.response)
  return a
}

export function voteOnPost(id, voteType) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/posts/${id}`,
    method: 'POST',
    headers: {
      'Authorization': '1337'
    },
    body: {
      option: voteType
    }
  }).map(e => e.response)
  return a
}

export function editPost(id, postTitle, postBody) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/posts/${id}`,
    method: 'PUT',
    headers: {
      'Authorization': '1337'
    },
    body: {
      title: postTitle,
      body: postBody
    }
  }).map(e => e.response)
  return a
}

export function removePost(id) {
  const a = Rx.Observable.ajax({
    url: `http://localhost:3001/posts/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': '1337'
    }
  }).map(e => e.response)
  return a
}

function checkObjectAgainstPropertyArray(object, properties) {
  const keys = _.keys(object)
  const postHasKorrektKeys = _.pullAll(keys, properties)

  if (postHasKorrektKeys.count > 0) {
    return false
  }

  return false
}
