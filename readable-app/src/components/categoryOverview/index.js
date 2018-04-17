import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as postsActions from 'actions/postsActions'
import * as postsDs from 'util/dataServices/postsDs'
import SingleCategoryDisplay from 'components/SingleCategoryDisplay'
import "components/categoryOverview/categoryOverview.css"

class CategoryOverView extends Component {
  static propTypes = {
    fetchAllPosts: PropTypes.func,
    categories: PropTypes.array
  }

  componentDidMount = function () {
    this.props.fetchAllPosts()
  }

  render() {
    return (
      <div>
        {
          this.props.categories.map(category => (
            <SingleCategoryDisplay key={category.name} category={category.name}/>
          ))
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: () => postsDs.fetchAllPosts().subscribe(function (data) {
      dispatch(postsActions.fetchAllPostsFromService(data))
    })
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.map(category => ({
      name: category.name,
      posts: state.posts.filter(post => post.category === category.name)
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverView)
