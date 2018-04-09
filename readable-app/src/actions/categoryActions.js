export const actionDefinition = {
  fetchCategory: "FETCH_CATEGORY_FULFILLED"
}

export function fetchCategoryMock() {
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

export function fetchCategoriesFromService(data) {
  return {
    type: actionDefinition.fetchCategory,
    payload: data
  }
}
