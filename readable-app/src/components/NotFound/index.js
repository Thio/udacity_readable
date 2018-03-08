import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NotFound extends Component {

  render() {
     return (
      <div className="notFound">
          <p>Page not found</p>
          <Link to="/">Back to home</Link>
      </div>
    )
  }
};

export default NotFound;
