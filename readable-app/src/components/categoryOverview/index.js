import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as postsActions from 'actions/postsActions'
import * as postsDs from 'dataServices/postsDs'

class CategoryOverView extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  componentDidMount = function () {
    this.props.fetchAllPosts;
  }

  render() {
    return (
      <div>
        {
          this.props.categories.map((category)=>(
            <ol key={category.name}>
              <li key={category.name}>{category.name}</li>
              {category.posts.map((post) => (
                <li key={post.id}>{post.author}</li>
              ))}
            </ol>
          ))
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: postsDs.fetchAllPosts().subscribe(function (data) {
      dispatch(postsActions.fetchAllPostsFromService(data));
    }),
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.map((category) => ({
      name: category.name,
      posts: state.posts.filter((post) => post.category === category.name)
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverView)
