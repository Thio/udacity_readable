import Rx from 'rxjs/Rx';

export const actionDefinition = {
  fetchCategory: "FETCH_CATEGORY_FULFILLED"
}

export function fetchCategorys(){
  return {
    type: actionDefinition.fetchCategory,
    payload: {
      "categories": [
        {
          "name": "react",
          "path": "react"
        },
        {
          "name": "redux",
          "path": "redux"
        },
        {
          "name": "udacity",
          "path": "udacity"
        }
      ]
    }
  }
}

export function fetchCategoriesFromService(){
  return {
    type: actionDefinition.fetchCategory,
    payload: fetchCategoriesAjax()
  }
}

function fetchCategoriesAjax(){
  const a = Rx.Observable
      .ajax({
        url: 'http://localhost:3001/categories',
        method: 'GET',
        headers: {
          'Authorization': 'whatever-you-want'
        }
      }).map(e => e.response);

  return a;
}