import Rx from 'rxjs/Rx';

export function fetchCategories(){
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

